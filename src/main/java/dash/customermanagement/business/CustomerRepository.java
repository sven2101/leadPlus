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

package dash.customermanagement.business;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dash.customermanagement.domain.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	public List<Customer> getByEmailIgnoreCase(String email);

	public Page<Customer> findByRealCustomer(Boolean realCustomer, Pageable pageable);

	@Query("select c from Customer c where c.realCustomer = true AND (LOWER(c.company) LIKE LOWER(CONCAT('%',:searchText,'%')) OR LOWER(c.firstname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(c.lastname) like LOWER(CONCAT('%',:searchText,'%')) OR LOWER(c.email) like LOWER(CONCAT('%',:searchText,'%')))")
	public Page<Customer> findRealCustomerBySearchText(@Param(value = "searchText") String searchText,
			Pageable pageable);

	public List<Customer> findByRealCustomer(Boolean realCustomer);

	public Page<Customer> findByFirstnameContainingOrLastnameContainingOrEmailContainingOrCompanyContainingAllIgnoreCase(
			String firstname, String lastname, String email, String company, Pageable pageable);

}
