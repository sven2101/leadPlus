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

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.CUSTOMER_NOT_FOUND;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import dash.customermanagement.domain.Customer;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;

@Service
public class CustomerService implements ICustomerService {

	private static final Logger logger = Logger.getLogger(CustomerService.class);

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public Page<Customer> getAllByPage(Integer start, Integer length, String searchText, Boolean allCustomers) {

		Page<Customer> page = null;
		Sort.Direction sortDirection = Sort.Direction.ASC;
		String sortColumn = "lastname";

		if (!allCustomers.booleanValue()) {
			if (null == searchText || searchText.equals("noSearchText") || searchText.equals("")) {
				page = customerRepository.findByRealCustomer(true,
						new PageRequest(start / length, length, sortDirection, sortColumn));
			} else {
				page = customerRepository.findRealCustomerBySearchText(searchText,
						new PageRequest(start / length, length, sortDirection, sortColumn));
			}
		} else {
			if (null == searchText || searchText.equals("noSearchText") || searchText.equals("")) {
				page = customerRepository.findAll(new PageRequest(start / length, length, sortDirection, sortColumn));
			} else {
				page = customerRepository
						.findByFirstnameContainingOrLastnameContainingOrEmailContainingOrCompanyContainingOrCustomerNumberContainingAllIgnoreCase(
								searchText, searchText, searchText, searchText, searchText,
								new PageRequest(start / length, length, sortDirection, sortColumn));
			}
		}

		return page;
	}

	@Override
	public Customer getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return customerRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(CUSTOMER_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(CUSTOMER_NOT_FOUND);
			logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public Customer save(final Customer customer) throws SaveFailedException {
		if (Optional.ofNullable(customer).isPresent()) {
			try {
				return customerRepository.save(customer);
			} catch (Exception ex) {
				logger.error(CustomerService.class.getSimpleName() + ex.getMessage(), ex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Customer update(final Customer customer) throws UpdateFailedException {
		if (Optional.ofNullable(customer).isPresent()) {
			try {
				return save(customer);
			} catch (IllegalArgumentException | SaveFailedException ex) {
				logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				customerRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

	@Override
	public List<Customer> getByEmailIgnoreCase(String email) {

		return customerRepository.getByEmailIgnoreCase(email);
	}

	@Override
	public List<Customer> getRealCustomer() {
		return customerRepository.findByRealCustomer(true);
	}

	@Override
	public List<Customer> getAll() {
		return customerRepository.findAll();
	}

	@Override
	public List<Customer> getCustomerBySearchText(String searchText) {
		return customerRepository
				.findByFirstnameContainingOrLastnameContainingOrEmailContainingOrCompanyContainingOrCustomerNumberContainingAllIgnoreCase(
						searchText, searchText, searchText, searchText, searchText);
	}

}
