/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.processmanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;

@Transactional
@Repository
public interface ProcessRepository extends PagingAndSortingRepository<Process, Long> {

	List<Process> findProcessesByStatus(Status status);

	List<Lead> findByStatusAndLeadIsNotNull(Status status);

	Page<Lead> findByLeadIsNotNull(Pageable pageable);

	@Query("select u from User u where u.firstname like %?1")
	Page<Lead> findByLeadInquirerFirstnameContainingOrLeadInquirerLastnameContainingOrLeadInquirerEmailContainingOrLeadInquirerCompanyContainingOrLeadInquirerPhoneContainingOrLeadContainerNameContainingOrLeadContainerDescriptionContainingOrLeadDestinationContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription,
			String destination, String message, String status, Pageable pageable);

	List<Offer> findByStatusAndOfferIsNotNull(Status status);

	Page<Offer> findByOfferIsNotNull(Pageable pageable);

	@Query("select o from Offer o " + "where u.firstname like %?1" + "OfferProspectFirstnameContaining OR" + "OfferProspectLastnameContaining"
			+ "OfferProspectEmailContaining" + "OfferProspectCompanyContaining" + "OfferProspectPhoneContaining" + "OfferContainerDescriptionContaining")
	Page<Offer> findByOfferProspectFirstnameContainingOrOfferProspectLastnameContainingOrOfferProspectEmailContainingOrOfferProspectCompanyContainingOrOfferProspectPhoneContainingOrOfferContainerNameContainingOrOfferContainerDescriptionContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription,
			String deliveryAddress, String status, Pageable pageable);

	List<Sale> findByStatusAndSaleIsNotNull(Status status);

	Page<Sale> findBySaleIsNotNull(Pageable pageable);

	@Query("select o from Offer o where u.firstname like %?1")
	Page<Sale> findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrSaleContainerNameContainingOrSaleContainerDescriptionContainingOrSaleTransportContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String containerName, String containerDescription, String transport,
			String status, Pageable pageable);

	List<Sale> findTopBySaleIsNotNullOrderBySaleTimestampDesc(int amount);
}
