package dash.customermanagement.business;

import org.springframework.data.repository.CrudRepository;

import dash.customermanagement.domain.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

}
