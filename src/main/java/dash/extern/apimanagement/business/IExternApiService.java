package dash.extern.apimanagement.business;

import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;
import dash.extern.apimanagement.domain.Api;

public interface IExternApiService {

	public Boolean test(final Api api);

	public ResponseEntity<String> createCustomer(final Api api, final Customer customer) throws JSONException;

	public ResponseEntity<String> createSalesOrder(final Api api, final AbstractWorkflow workflow) throws JSONException;
}
