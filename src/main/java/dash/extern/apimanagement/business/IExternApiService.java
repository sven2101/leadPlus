package dash.extern.apimanagement.business;

import java.io.UnsupportedEncodingException;

import org.json.JSONException;
import org.json.JSONObject;

import dash.common.AbstractWorkflow;
import dash.common.FailedToDecryptCipherTextException;
import dash.customermanagement.domain.Customer;
import dash.exceptions.APIIntegrationException;
import dash.extern.apimanagement.domain.Api;

public interface IExternApiService {

	public void test(final Api api)
			throws APIIntegrationException, UnsupportedEncodingException, FailedToDecryptCipherTextException;

	public JSONObject createCustomer(final Api api, final Customer customer)
			throws JSONException, UnsupportedEncodingException, FailedToDecryptCipherTextException;

	public JSONObject createSalesOrder(final Api api, final AbstractWorkflow workflow, final JSONObject weclappCustomer)
			throws JSONException, UnsupportedEncodingException, FailedToDecryptCipherTextException;
}
