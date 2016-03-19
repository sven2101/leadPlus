package dash.processmanagement.sale.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.sale.SaleRepository;
import dash.processmanagement.sale.customer.CustomerRepository;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository 	saleRepository;
    
    @Autowired
    private ProcessRepository 	processRepository;
    
    @Autowired
    private CustomerRepository 	customerRepository;
    
    public void createSaleByProcess(Long processId, Sale sale){
	Process process = processRepository.findOne(processId);
	if (process != null){
	    saleRepository.save(sale);
	    process.setSale(sale);
	    processRepository.save(process);
	}
    }
    
    public void createSale(Sale sale){
	if(sale != null){
	    if(sale.getCustomer() != null){
	    	customerRepository.save(sale.getCustomer());
	    }
	    saleRepository.save(sale);
	}
    }
}
