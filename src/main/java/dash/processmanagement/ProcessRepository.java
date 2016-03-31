package dash.processmanagement;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.status.Status;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 12.10.2015.
 */

@Transactional
@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    List<Process> findProcessesByStatus(Status status);

    List<Lead> findByStatusAndLeadIsNotNull(Status status);

    List<Lead> findByLeadIsNotNull();

    List<Offer> findByStatusAndOfferIsNotNull(Status status);

    List<Offer> findByOfferIsNotNull();

    List<Sale> findByStatusAndSaleIsNotNull(Status status);

    List<Sale> findBySaleIsNotNull();

    List<Sale> findTop10BySaleIsNotNullOrderBySaleTimestampDesc();
}
