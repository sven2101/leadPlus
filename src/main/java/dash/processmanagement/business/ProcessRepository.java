
package dash.processmanagement.business;

import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dash.processmanagement.domain.Process;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;

public interface ProcessRepository extends JpaRepository<Process, Long> {

	List<Process> findProcessesByStatus(Status status);

	Process findById(Long id);

	Page<Process> findById(Long id, Pageable pageable);

	List<Process> findByStatusAndLeadIsNotNull(Status status);

	Integer countByStatusAndLeadIsNotNull(Status status);

	Page<Process> findByLeadIsNotNull(Pageable pageable);

	Page<Process> findByLeadCustomerFirstnameContainingOrLeadCustomerLastnameContainingOrLeadCustomerEmailContainingOrLeadCustomerCompanyContainingOrLeadCustomerPhoneContainingOrLeadDeliveryAddressLineContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String deliveryAddressLine,
			String message, String status, Pageable pageable);

	List<Process> findByStatusAndOfferIsNotNull(Status status);

	Integer countByStatusAndOfferIsNotNull(Status status);

	Page<Process> findByOfferIsNotNull(Pageable pageable);

	Page<Process> findByOfferCustomerFirstnameContainingOrOfferCustomerLastnameContainingOrOfferCustomerEmailContainingOrOfferCustomerCompanyContainingOrOfferCustomerPhoneContainingOrOfferDeliveryAddressLineContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String deliveryAddressLine,
			String status, Pageable pageable);

	List<Process> findByStatusAndSaleIsNotNull(Status status);

	Page<Process> findByStatus(Status status, Pageable pageable);

	Page<Process> findBySaleIsNotNullAndSaleTimestampAfter(Calendar after, Pageable pageable);

	Page<Process> findByStatusInAndLeadIsNotNull(Collection<Status> status, Pageable pageable);

	Page<Process> findByStatusInAndOfferIsNotNull(Collection<Status> status, Pageable pageable);

	Page<Process> findByStatusInAndSaleIsNotNull(Collection<Status> status, Pageable pageable);

	Page<Process> findByStatusInAndProcessorAndLeadIsNotNull(Collection<Status> status, User processor,
			Pageable pageable);

	Page<Process> findByStatusInAndProcessorAndOfferIsNotNull(Collection<Status> status, User processor,
			Pageable pageable);

	Page<Process> findByStatusInAndProcessorAndSaleIsNotNull(Collection<Status> status, User processor,
			Pageable pageable);

	Integer countByStatusAndSaleIsNotNull(Status status);

	Page<Process> findBySaleIsNotNull(Pageable pageable);

	Page<Process> findBySaleIsNotNullAndProcessorAndSaleTimestampAfter(User processor, Calendar after,
			Pageable pageable);

	Page<Process> findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleDeliveryAddressLineContainingOrSaleCustomerPhoneContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
			String firstname, String lastname, String email, String company, String deliveryAddress, String phone,
			String status, Pageable pageable);

	List<Process> findTop100BySaleIsNotNullOrderBySaleTimestampDesc();

	List<Process> findTop10BySaleIsNotNullAndSaleTimestampAfterOrderBySaleTimestampDesc(Calendar after);

	List<Process> findTop50BySaleIsNotNullOrderBySaleTimestampDesc();

	List<Process> findAll(Specification<Process> spec);

	Page<Process> findAll(Specification<Process> spec, Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.lead is not null AND (LOWER(p.lead.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findLeadProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.offer is not null AND (LOWER(p.offer.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findOfferProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.sale is not null AND p.sale.timestamp > :inputCalendar AND (LOWER(p.sale.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findSaleProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, @Param(value = "inputCalendar") Calendar calendar,
			Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.processor = :user AND p.lead is not null AND (LOWER(p.lead.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.lead.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findMyLeadProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, @Param(value = "user") User user, Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.processor = :user AND p.offer is not null AND (LOWER(p.offer.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.offer.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findMyOfferProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, @Param(value = "user") User user, Pageable pageable);

	@Query("SELECT p FROM Process p WHERE p.deleted = false AND p.status IN :status AND p.processor = :user AND p.sale is not null AND p.sale.timestamp > :inputCalendar AND (LOWER(p.sale.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.email) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(p.sale.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Process> findMySaleProcessesByStatusAndSearchText(@Param(value = "searchText") String searchText,
			@Param(value = "status") Collection<Status> status, @Param(value = "user") User user,
			@Param(value = "inputCalendar") Calendar calendar, Pageable pageable);

	@Query("SELECT sum(o.netPrice) FROM Offer o, Process p WHERE p.status IN :inputStatus AND p.offer.id = o.id AND p.deleted = false AND o.deleted = false")
	public Double getOfferSumByStatus(@Param(value = "inputStatus") Collection<Status> inputStatus);

	@Query("SELECT sum(s.saleTurnover) FROM Sale s, Process p WHERE p.status = 'SALE' AND p.sale.id = s.id AND s.timestamp > :inputCalendar AND p.deleted = false AND s.deleted = false")
	public Double getSaleSumByStatus(@Param(value = "inputCalendar") Calendar calendar);
	
	@Query("SELECT p FROM Process p WHERE p.status != 'CLOSED' AND (p.id IN"
			+ "(SELECT p2.id from Process p2 WHERE p2.deleted = false AND p2.sale IS NULL AND p2.processor = :user AND p2.lead IS NOT NULL AND p2.offer IS NULL AND (LOWER(p2.lead.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p2.lead.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p2.lead.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p2.lead.customer.email) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p2.lead.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))) "
			+ "OR p.id IN (SELECT p3.id FROM Process p3 WHERE p3.deleted = false AND p3.sale IS NULL AND p3.processor = :user AND p3.offer IS NOT NULL AND (LOWER(p3.offer.customer.company) LIKE LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p3.offer.customer.firstname) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p3.offer.customer.lastname) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p3.offer.customer.email) like LOWER(CONCAT('%',:searchText,'%')) "
			+ "OR LOWER(p3.offer.customer.customerNumber) like LOWER(CONCAT('%',:searchText,'%')))))")
	public Page<Process> findMyTasksProcessesSearchText(@Param(value = "searchText") String searchText, @Param(value = "user") User user, Pageable pageable);

}
