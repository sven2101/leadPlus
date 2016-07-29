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
	public List<Customer> getAll() {
		return customerRepository.findAll();
	}

	@Override
	public Customer getCustomerById(final Long id) throws NotFoundException {
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
	public Customer save(final Customer inquirer) throws SaveFailedException {
		if (Optional.ofNullable(inquirer).isPresent()) {
			try {
				return customerRepository.save(inquirer);
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
			Customer updateCustomer;
			try {
				updateCustomer = customerRepository.findOne(customer.getId());
				updateCustomer.setAddress(customer.getAddress());
				updateCustomer.setCompany(customer.getCompany());
				updateCustomer.setEmail(customer.getEmail());
				updateCustomer.setFirstname(customer.getFirstname());
				updateCustomer.setLastname(customer.getLastname());
				updateCustomer.setPhone(customer.getPhone());
				updateCustomer.setTitle(customer.getTitle());
				return customerRepository.save(updateCustomer);
			} catch (IllegalArgumentException iaex) {
				logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, iaex);
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

}
