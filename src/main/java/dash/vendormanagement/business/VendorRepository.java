
package dash.vendormanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.vendormanagement.domain.Vendor;

//@Repository
//@Transactional
public interface VendorRepository extends JpaRepository<Vendor, Long> {

	Vendor findByNameIgnoreCase(String name);

}