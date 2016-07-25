package dash.processmanagement.sale.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.sale.domain.Sale;

@Service
public interface ISaleService {
    
    void createSale(Sale sale);
}
