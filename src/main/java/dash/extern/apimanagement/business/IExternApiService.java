package dash.extern.apimanagement.business;

import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;

public interface IExternApiService {

	public ResponseEntity<String> createCustomer(final Customer customer);

	public ResponseEntity<String> createSalesOrder(final AbstractWorkflow workflow) throws JSONException;
}
