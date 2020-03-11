
package dash.extern.apimanagement.business;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.extern.apimanagement.domain.Api;
import dash.extern.apimanagement.domain.ApiVendor;

public interface ApiRepository extends JpaRepository<Api, Long> {

	public List<Api> findByIsDeactivatedFalseAndIsVerifiedTrueAndApiVendor(ApiVendor apiVendor);
}
