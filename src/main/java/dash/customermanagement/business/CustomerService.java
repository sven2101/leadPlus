package dash.customermanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.CUSTOMER_NOT_FOUND;
import static dash.Constants.DELETE_FAILED_EXCEPTION;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dash.consistencymanagement.business.ConsistencyService;
import dash.customermanagement.domain.Customer;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;

@Service
@Transactional
public class CustomerService extends ConsistencyService {

	private static final Logger logger = Logger.getLogger(CustomerService.class);

	@Autowired
	private CustomerRepository customerRepository;

	public Page<Customer> getAllByPage(Integer start, Integer length, String searchText, Boolean allCustomers) {

		Page<Customer> page = null;
		Sort.Direction sortDirection = Sort.Direction.ASC;
		String sortColumn = "lastname";

		if (!allCustomers.booleanValue()) {
			if (null == searchText || searchText.equals("noSearchText") || searchText.equals("")) {
				page = customerRepository.findByRealCustomerAndDeletedFalse(true,
						new PageRequest(start / length, length, sortDirection, sortColumn));
			} else {
				page = customerRepository.findRealCustomerBySearchText(searchText,
						new PageRequest(start / length, length, sortDirection, sortColumn));
			}
		} else {
			if (null == searchText || searchText.equals("noSearchText") || searchText.equals("")) {
				page = customerRepository
						.findByDeletedFalse((new PageRequest(start / length, length, sortDirection, sortColumn)));
			} else {
				page = customerRepository.findPageableCustomerBySearchText(searchText,
						new PageRequest(start / length, length, sortDirection, sortColumn));
			}
		}

		return page;
	}

	public Customer getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return customerRepository.findByIdAndDeletedFalse(id);
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

	public Customer save(final Customer customer) throws ConsistencyFailedException {
		if (customer == null) {
			logger.error(CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
			throw new IllegalArgumentException(
					CUSTOMER_NOT_FOUND + CustomerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
		}
		this.checkConsistencyAndSetTimestamp(customer, customerRepository);
		return customerRepository.save(customer);
	}

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

	public List<Customer> getByEmailIgnoreCase(String email) {

		return customerRepository.findByEmailIgnoreCaseAndDeletedFalse(email);
	}

	public List<Customer> getRealCustomer() {
		return customerRepository.findByRealCustomerAndDeletedFalse(true);
	}

	public List<Customer> getAll() {
		return customerRepository.findByDeletedFalse();
	}

	public List<Customer> getCustomerBySearchText(String searchText) {
		return customerRepository.findCustomerBySearchText(searchText);
	}

}
