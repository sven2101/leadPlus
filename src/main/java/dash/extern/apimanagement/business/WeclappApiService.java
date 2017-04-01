package dash.extern.apimanagement.business;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;
import dash.productmanagement.domain.OrderPosition;

@Service
public class WeclappApiService implements IExternApiService {

	private static final Logger logger = Logger.getLogger(WeclappApiService.class);

	private String version;
	private String tenant;
	private String uri;
	private RestTemplate restTemplate;

	@Autowired
	public WeclappApiService(RestTemplate restTemplate) {
		this.version = "v1";
		this.restTemplate = restTemplate;
		this.uri = "https://" + tenant + ".weclapp.com/webapp/api/" + version + "/";
	}

	@Override
	public void createCustomer(final Customer customer) {
		final String resource = "customer";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "");

		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("company", customer.getCompany());
		map.add("currencyId", "248");
		map.add("currencyName", "EUR");
		map.add("partyType", "ORGANIZATION");
		map.add("email", customer.getEmail());
		map.add("firstName", customer.getFirstname());
		map.add("lastName", customer.getLastname());
		map.add("fax", customer.getFax());
		map.add("mobilePhone1", customer.getMobile());
		map.add("partyType", "");
		map.add("phone", customer.getPhone());
		map.add("salutation", customer.getTitle().toString());

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

		ResponseEntity<String> response = restTemplate.postForEntity(uri + resource, request, String.class);

		logger.debug(response.toString());
	}

	@Override
	public void createSalesOrder(final AbstractWorkflow workflow) throws JSONException {
		final String resource = "customer";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "");

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

		ResponseEntity<String> response = restTemplate.postForEntity(uri + resource, request, String.class);

		logger.debug(response.toString());

	}
}
