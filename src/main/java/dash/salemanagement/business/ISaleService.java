package dash.salemanagement.business;

import org.springframework.stereotype.Service;

import dash.salemanagement.domain.Sale;

@Service
public interface ISaleService {
    
    void createSale(Sale sale);
}
