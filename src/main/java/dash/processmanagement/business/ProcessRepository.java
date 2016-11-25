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

import java.util.Calendar;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

import dash.processmanagement.domain.Process;
import dash.statusmanagement.domain.Status;

//@Transactional
//@Repository
public interface ProcessRepository extends PagingAndSortingRepository<Process, Long> {

	List<Process> findProcessesByStatus(Status status);

	List<Process> findByStatusAndLeadIsNotNull(Status status);

	Page<Process> findByLeadIsNotNull(Pageable pageable);

	Page<Process> findByLeadCustomerFirstnameContainingOrLeadCustomerLastnameContainingOrLeadCustomerEmailContainingOrLeadCustomerCompanyContainingOrLeadCustomerPhoneContainingOrLeadDeliveryAddressContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String deliveryAddress,
			String message, String status, Pageable pageable);

	List<Process> findByStatusAndOfferIsNotNull(Status status);

	Page<Process> findByOfferIsNotNull(Pageable pageable);

	Page<Process> findByOfferCustomerFirstnameContainingOrOfferCustomerLastnameContainingOrOfferCustomerEmailContainingOrOfferCustomerCompanyContainingOrOfferCustomerPhoneContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String deliveryAddress,
			String status, Pageable pageable);

	List<Process> findByStatusAndSaleIsNotNull(Status status);

	Page<Process> findBySaleIsNotNull(Pageable pageable);

	Page<Process> findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String status,
			Pageable pageable);

	List<Process> findTop100BySaleIsNotNullOrderBySaleTimestampDesc();

	List<Process> findTop10BySaleIsNotNullAndSaleTimestampAfterOrderBySaleTimestampDesc(Calendar after);

	List<Process> findTop50BySaleIsNotNullOrderBySaleTimestampDesc();

	List<Process> findAll(Specification<Process> spec);
}
