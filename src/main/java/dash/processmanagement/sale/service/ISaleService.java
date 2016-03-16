package dash.processmanagement.sale.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.sale.Sale;

@Service
public interface ISaleService {
    
    public void createSale(Long processId, Sale sale);
}
