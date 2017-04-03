package dash.extern.apimanagement.business;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;
import dash.extern.apimanagement.domain.Api;
import dash.productmanagement.domain.OrderPosition;

@Service
public class WeclappApiService implements IExternApiService {

	private static final Logger logger = Logger.getLogger(WeclappApiService.class);
	private static final String BASE_URI = "https://{tenant}.weclapp.com/webapp/api/{version}";

	private RestTemplate restTemplate;

	@Autowired
	public WeclappApiService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@Override
	public Boolean test(final Api api) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set(api.getAuthenticationKey(), api.getAuthenticationValue());

		HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);

		Map<String, String> vars = new HashMap<>();
		vars.put("tenant", api.getTenant());
		vars.put("version", api.getVersion());

		ResponseEntity<String> response = restTemplate.exchange(BASE_URI + "/customer", HttpMethod.GET, entity,
				String.class, vars);

		return response.getStatusCode().equals(HttpStatus.OK) ? false : true;
	}

	@Override
	public ResponseEntity<String> createCustomer(final Api api, final Customer customer) throws JSONException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set(api.getAuthenticationKey(), api.getAuthenticationValue());

		Map<String, String> vars = new HashMap<>();
		vars.put("tenant", api.getTenant());
		vars.put("version", api.getVersion());

		JSONArray addresses = new JSONArray();

		if (customer.getDeliveryAddress() != null) {
			JSONObject deliveryAddress = new JSONObject();
			deliveryAddress.put("city",
					customer.getDeliveryAddress().getCity() == null ? "" : customer.getDeliveryAddress().getCity());
			deliveryAddress.put("company", customer.getCompany() == null ? "" : customer.getCompany());
			deliveryAddress.put("firstName", customer.getFirstname() == null ? "" : customer.getFirstname());
			deliveryAddress.put("lastName", customer.getLastname() == null ? "" : customer.getLastname());
			deliveryAddress.put("street1",
					customer.getDeliveryAddress().getStreet() == null ? "" : customer.getDeliveryAddress().getStreet());
			deliveryAddress.put("state",
					customer.getDeliveryAddress().getState() == null ? "" : customer.getDeliveryAddress().getState());
			deliveryAddress.put("city",
					customer.getDeliveryAddress().getCity() == null ? "" : customer.getDeliveryAddress().getCity());
			if (customer.getDeliveryAddress().getCountry() != null) {
				if (customer.getDeliveryAddress().getCountry().contains("DE")
						|| customer.getDeliveryAddress().getCountry().contains("de")
						|| customer.getDeliveryAddress().getCountry().contains("De"))
					deliveryAddress.put("countryCode", "DE");
			}
			deliveryAddress.put("countryCode", "DE");
			deliveryAddress.put("invoiceAddress", "false");
			deliveryAddress.put("deliveryAddress", "true");
			addresses.put(deliveryAddress);
		}
		if (customer.getBillingAddress() != null) {
			JSONObject invoiceAddress = new JSONObject();
			invoiceAddress.put("company", customer.getCompany() == null ? "" : customer.getCompany());
			invoiceAddress.put("firstName", customer.getFirstname() == null ? "" : customer.getFirstname());
			invoiceAddress.put("lastName", customer.getLastname() == null ? "" : customer.getLastname());
			invoiceAddress.put("street1",
					customer.getBillingAddress().getStreet() == null ? "" : customer.getDeliveryAddress().getStreet());
			invoiceAddress.put("zipcode",
					customer.getBillingAddress().getZip() == null ? "" : customer.getDeliveryAddress().getZip());
			invoiceAddress.put("state",
					customer.getBillingAddress().getState() == null ? "" : customer.getDeliveryAddress().getState());
			invoiceAddress.put("city",
					customer.getBillingAddress().getCity() == null ? "" : customer.getBillingAddress().getCity());
			if (customer.getBillingAddress().getCountry() != null) {
				if (customer.getBillingAddress().getCountry().contains("DE")
						|| customer.getBillingAddress().getCountry().contains("de")
						|| customer.getBillingAddress().getCountry().contains("De"))
					invoiceAddress.put("countryCode", "DE");
			}
			invoiceAddress.put("countryCode", "DE");
			invoiceAddress.put("invoiceAddress", "true");
			invoiceAddress.put("deliveryAddress", "false");
			addresses.put(invoiceAddress);
		}

		JSONObject body = new JSONObject();
		body.put("company", customer.getCompany() == null ? "" : customer.getCompany());
		if (customer.getCompany() == null)
			body.put("partyType", "PERSON");
		else
			body.put("partyType", "ORGANIZATION");
		body.put("addresses", addresses);
		body.put("currencyId", "248");
		body.put("currencyName", "EUR");
		body.put("email", customer.getEmail() == null ? "" : customer.getEmail());
		body.put("firstName", customer.getFirstname() == null ? "" : customer.getFirstname());
		body.put("lastName", customer.getLastname() == null ? "" : customer.getLastname());
		body.put("fax", customer.getFax() == null ? "" : customer.getFax());
		body.put("mobilePhone1", customer.getMobile() == null ? "" : customer.getMobile());
		body.put("phone", customer.getPhone() == null ? "" : customer.getPhone());

		HttpEntity request = new HttpEntity(body.toString(), headers);

		ResponseEntity<String> response = restTemplate.postForEntity(BASE_URI + "/customer", request, String.class,
				vars);

		logger.debug(response.toString());
		return response;
	}

	@Override
	public ResponseEntity<String> createSalesOrder(final Api api, final AbstractWorkflow workflow)
			throws JSONException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set(api.getAuthenticationKey(), api.getAuthenticationValue());

		Map<String, String> vars = new HashMap<>();
		vars.put("tenant", api.getTenant());
		vars.put("version", api.getVersion());

		MultiValueMap<String, String> deliveryAddress = new LinkedMultiValueMap<>();
		deliveryAddress.add("city", workflow.getCustomer().getDeliveryAddress().getCity());
		deliveryAddress.add("company", workflow.getCustomer().getCompany());
		deliveryAddress.add("countryCode", workflow.getCustomer().getDeliveryAddress().getCountry());
		deliveryAddress.add("firstName", workflow.getCustomer().getFirstname());
		deliveryAddress.add("lastName", workflow.getCustomer().getLastname());
		deliveryAddress.add("street1", workflow.getCustomer().getDeliveryAddress().getStreet());

		MultiValueMap<String, String> invoiceAddress = new LinkedMultiValueMap<>();
		invoiceAddress.add("city", workflow.getCustomer().getBillingAddress().getCity());
		invoiceAddress.add("company", workflow.getCustomer().getCompany());
		invoiceAddress.add("countryCode", workflow.getCustomer().getBillingAddress().getCountry());
		invoiceAddress.add("firstName", workflow.getCustomer().getFirstname());
		invoiceAddress.add("lastName", workflow.getCustomer().getLastname());
		invoiceAddress.add("street1", workflow.getCustomer().getBillingAddress().getStreet());

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

		MultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
		map.add("commercialLanguage", "de");
		map.add("customerId", "1603");
		map.add("deliveryAddress", deliveryAddress);
		map.add("invoiceAddress", invoiceAddress);
		map.add("orderItems", orderItems);

		HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<MultiValueMap<String, Object>>(map, headers);

		ResponseEntity<String> response = restTemplate.postForEntity(BASE_URI + "/salesOrder", request, String.class,
				vars);

		logger.debug(response.toString());
		return response;
	}

}
