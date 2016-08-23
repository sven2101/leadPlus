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
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;

@Transactional
@Repository
public interface ProcessRepository extends PagingAndSortingRepository<Process, Long> {

	List<Process> findProcessesByStatus(Status status);

	List<Process> findByStatusAndLeadIsNotNull(Status status);

	Page<Lead> findByLeadIsNotNull(Pageable pageable);

	Page<Lead> findByLeadCustomerFirstnameContainingOrLeadCustomerLastnameContainingOrLeadCustomerEmailContainingOrLeadCustomerCompanyContainingOrLeadCustomerPhoneContainingOrLeadProductNameContainingOrLeadProductDescriptionContainingOrLeadDeliveryAddressContainingOrLeadMessageContainingOrStatusContainingAllIgnoreCaseAndLeadIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String productName, String productDescription,
			String deliveryAddress, String message, String status, Pageable pageable);

	List<Process> findByStatusAndOfferIsNotNull(Status status);

	Page<Offer> findByOfferIsNotNull(Pageable pageable);

	Page<Offer> findByOfferCustomerFirstnameContainingOrOfferCustomerLastnameContainingOrOfferCustomerEmailContainingOrOfferCustomerCompanyContainingOrOfferCustomerPhoneContainingOrOfferProductNameContainingOrOfferProductDescriptionContainingOrOfferDeliveryAddressContainingOrStatusContainingAllIgnoreCaseAndOfferIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String productName, String productDescription,
			String deliveryAddress, String status, Pageable pageable);

	List<Process> findByStatusAndSaleIsNotNull(Status status);

	Page<Sale> findBySaleIsNotNull(Pageable pageable);

	Page<Sale> findBySaleCustomerFirstnameContainingOrSaleCustomerLastnameContainingOrSaleCustomerEmailContainingOrSaleCustomerCompanyContainingOrSaleCustomerPhoneContainingOrSaleProductNameContainingOrSaleProductDescriptionContainingOrStatusContainingAllIgnoreCaseAndSaleIsNotNull(
			String firstname, String lastname, String email, String company, String phone, String productName, String productDescription, String status,
			Pageable pageable);

	List<Sale> findTop100BySaleIsNotNullOrderBySaleTimestampDesc();

	List<Sale> findTop10BySaleIsNotNullOrderBySaleTimestampDesc();
}
