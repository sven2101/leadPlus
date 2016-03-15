package dash.processmanagement.vendor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

}