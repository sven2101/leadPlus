package dash.extern.apimanagement.business;

import org.json.JSONException;

import dash.common.AbstractWorkflow;
import dash.customermanagement.domain.Customer;

public interface IExternApiService {

	public void createCustomer(final Customer customer);

	public void createSalesOrder(final AbstractWorkflow workflow) throws JSONException;
}
