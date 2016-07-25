package dash.processmanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;

/**
 * Created by Andreas on 12.10.2015.
 */

@Transactional
@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    List<Process> findProcessesByStatus(Status status);

    List<Lead> findByStatusAndLeadIsNotNull(Status status);

    Page<Lead> findByLeadIsNotNull(Pageable pageable);

    Page<Lead> findByLeadInquirerFirstnameContainingOrLeadInquirerLastnameContainingOrLeadInquirerEmailContainingOrLeadInquirerCompanyContainingOrLeadInquirerPhoneContainingOrLeadContainerNameContainingOrLeadContainerDescriptionContainingOrLeadDestinationContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription, String destination, String message, String status, Pageable pageable);

    List<Offer> findByStatusAndOfferIsNotNull(Status status);

    Page<Offer> findByOfferIsNotNull(Pageable pageable);

    Page<Offer> findByOfferProspectFirstnameContainingOrOfferProspectLastnameContainingOrOfferProspectEmailContainingOrOfferProspectCompanyContainingOrOfferProspectPhoneContainingOrOfferContainerNameContainingOrOfferContainerDescriptionContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription, String deliveryAddress, String status, Pageable pageable);

    List<Sale> findByStatusAndSaleIsNotNull(Status status);

    Page<Sale> findBySaleIsNotNull(Pageable pageable);

    Page<Sale> findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrSaleContainerNameContainingOrSaleContainerDescriptionContainingOrSaleTransportContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription, String transport, String status, Pageable pageable);

    List<Sale> findTop10BySaleIsNotNullOrderBySaleTimestampDesc();

    List<Sale> findTop100BySaleIsNotNullOrderBySaleTimestampDesc();
}
