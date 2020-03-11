package dash.tenantmanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.tenantmanagement.domain.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {

	Tenant findByTenantKeyIgnoreCase(String name);

}
