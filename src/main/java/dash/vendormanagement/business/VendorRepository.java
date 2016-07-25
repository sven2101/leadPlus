package dash.vendormanagement.business;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.vendormanagement.domain.Vendor;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
@Transactional
public interface VendorRepository extends JpaRepository<Vendor, Long> {
	Vendor findByName(String name);
}