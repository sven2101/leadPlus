package dash.processmanagement.sale.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.sale.Sale;

@Service
public interface ISaleService {
    
    public void createSaleByProcess(Long processId, Sale sale);
    public void createSale(Sale sale);
}
