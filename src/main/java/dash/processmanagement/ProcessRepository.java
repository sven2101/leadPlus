package dash.processmanagement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.status.Status;

/**
 * Created by Andreas on 12.10.2015.
 */

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    List<Process> 	findProcessesByStatus(Status status);
    List<Lead> 		findByStatusAndLeadIsNotNull(Status status);
    List<Offer> 	findByStatusAndOfferIsNotNull(Status status);
    List<Sale>		findByStatusAndSaleIsNotNull(Status status);
}
