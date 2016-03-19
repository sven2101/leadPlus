package dash.processmanagement.sale.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.sale.Sale;
import dash.processmanagement.sale.SaleRepository;
import dash.processmanagement.sale.customer.CustomerRepository;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository 	saleRepository;
    
    @Autowired
    private CustomerRepository 	customerRepository;
 
    public void createSale(Sale sale){
	if(Optional.ofNullable(sale.getCustomer()).isPresent())	   
	    customerRepository.save(sale.getCustomer());

	saleRepository.save(sale);	
    }
}
