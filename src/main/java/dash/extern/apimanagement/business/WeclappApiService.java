package dash.extern.apimanagement.business;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import dash.common.AbstractWorkflow;
import dash.common.FailedToDecryptCipherTextException;
import dash.customermanagement.domain.Customer;
import dash.exceptions.APIIntegrationException;
import dash.extern.apimanagement.domain.Api;
import dash.extern.apimanagement.weclapp.domain.WeclappCustomer;
import dash.extern.apimanagement.weclapp.domain.WeclappDeliveryAddress;
import dash.extern.apimanagement.weclapp.domain.WeclappInvoiceAddress;
import dash.productmanagement.domain.OrderPosition;

@Service
public class WeclappApiService implements IExternApiService {

	private static final Logger logger = Logger.getLogger(WeclappApiService.class);
	private static final String BASE_URI = "https://{tenant}.weclapp.com/webapp/api/{version}";

	private RestTemplate restTemplate;
	private ApiService apiService;

	@Autowired
	public WeclappApiService(RestTemplate restTemplate, ApiService apiService) {
		this.restTemplate = restTemplate;
		this.apiService = apiService;
	}

	@Override
	public void test(final Api api)
			throws APIIntegrationException, UnsupportedEncodingException, FailedToDecryptCipherTextException {

		HttpHeaders headers = createHeader(api);
		HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);

		try {
			restTemplate.exchange(BASE_URI + "/tax", HttpMethod.GET, entity, String.class, createVars(api));
		} catch (Exception ex) {
			logger.error(ex);
			throw new APIIntegrationException("Cannot connect to Weclapp API.");
		}
	}

	@Override
	public JSONObject createCustomer(final Api api, final Customer customer)
			throws JSONException, UnsupportedEncodingException, FailedToDecryptCipherTextException {
		HttpHeaders headers = createHeader(api);

		WeclappDeliveryAddress weclappDeliveryAddress = new WeclappDeliveryAddress(customer);
		WeclappInvoiceAddress weclappInvoiceAddress = new WeclappInvoiceAddress(customer);
		WeclappCustomer weclappCustomer = new WeclappCustomer(customer, weclappDeliveryAddress, weclappInvoiceAddress);
		HttpEntity<WeclappCustomer> request = new HttpEntity<>(weclappCustomer, headers);

		ResponseEntity<String> response = restTemplate.postForEntity(BASE_URI + "/customer", request, String.class,
				createVars(api));

		return new JSONObject(response.getBody());
	}

	@Override
	public JSONObject createSalesOrder(final Api api, final AbstractWorkflow workflow, final JSONObject weclappCustomer)
			throws JSONException, UnsupportedEncodingException, FailedToDecryptCipherTextException {

		HttpHeaders headers = this.createHeader(api);

		JSONObject body = new JSONObject();
		body.put("commercialLanguage", "de");

		String weclappCustomerId;
		if (weclappCustomer != null) {
			weclappCustomerId = weclappCustomer.getString("id");
			body.put("customerId", weclappCustomerId);
		}

		if (workflow.getCustomer().getDeliveryAddress() != null) {
			JSONObject deliveryAddress = new JSONObject();
			deliveryAddress.put("city", workflow.getCustomer().getDeliveryAddress().getCity());
			deliveryAddress.put("company", workflow.getCustomer().getCompany());
			deliveryAddress.put("countryCode", "DE");
			deliveryAddress.put("firstName", workflow.getCustomer().getFirstname());
			deliveryAddress.put("lastName", workflow.getCustomer().getLastname());
			deliveryAddress.put("street1", workflow.getCustomer().getDeliveryAddress().getStreet());
			body.put("deliveryAddress", deliveryAddress);
		}

		if (workflow.getCustomer().getBillingAddress() != null) {
			JSONObject invoiceAddress = new JSONObject();
			invoiceAddress.put("city", workflow.getCustomer().getBillingAddress().getCity());
			invoiceAddress.put("company", workflow.getCustomer().getCompany());
			invoiceAddress.put("countryCode", "DE");
			invoiceAddress.put("firstName", workflow.getCustomer().getFirstname());
			invoiceAddress.put("lastName", workflow.getCustomer().getLastname());
			invoiceAddress.put("street1", workflow.getCustomer().getBillingAddress().getStreet());
			body.put("invoiceAddress", invoiceAddress);
		}

		if (workflow.getOrderPositions() != null) {
			JSONArray orderItems = new JSONArray();
			int positionNumber = 1;
			for (OrderPosition orderPosition : workflow.getOrderPositions()) {
				JSONObject order = new JSONObject();
				order.put("articleNumber", orderPosition.getProduct().getProductNumber());
				order.put("description", orderPosition.getProduct().getDescription());
				order.put("discountPercentage", orderPosition.getDiscount());
				order.put("positionNumber", positionNumber++);
				order.put("quantity", orderPosition.getAmount());
				orderItems.put(order);
			}
			body.put("orderItems", orderItems);
		}

		HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);

		ResponseEntity<String> response = restTemplate.postForEntity(BASE_URI + "/salesOrder", request, String.class,
				createVars(api));

		return new JSONObject(response.getBody());
	}

	private HttpHeaders createHeader(final Api encryptedApi)
			throws FailedToDecryptCipherTextException, UnsupportedEncodingException {
		final HttpHeaders headers = new HttpHeaders();
		/*
		 * Api api = encryptedApi; if (!encryptedApi.isDecrypted()) { Api tmpApi
		 * = apiService.getById(encryptedApi.getId());
		 * encryptedApi.setPassword(tmpApi.getPassword());
		 * encryptedApi.setSalt(tmpApi.getSalt());
		 * encryptedApi.setIv(tmpApi.getIv()); } api = (Api)
		 * Encryptor.decrypt(encryptedApi); String authenticationValue = new
		 * String(api.getPassword(), UTF_8);
		 * 
		 * headers.setContentType(MediaType.APPLICATION_JSON);
		 * headers.set(api.getAuthenticationKey(), authenticationValue);
		 */
		return headers;
	}

	private Map<String, String> createVars(final Api api) {
		Map<String, String> vars = new HashMap<>();
		vars.put("tenant", api.getTenant());
		vars.put("version", api.getVersion());
		return vars;
	}

}
