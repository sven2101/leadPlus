package dash.processmanagement.sale.service;

import java.util.Optional;

import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.sale.Sale;
import dash.processmanagement.sale.SaleRepository;
import dash.processmanagement.sale.customer.CustomerRepository;

@Service
public class SaleService implements ISaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public void createSale(Sale sale) {
        if (Optional.ofNullable(sale.getVendor()).isPresent()) {
            Vendor vendor = vendorRepository.findByName(sale.getVendor().getName());
            if (Optional.ofNullable(vendor).isPresent()) {
                vendorRepository.save(sale.getVendor());
            } else {
                sale.setVendor(vendor);
            }
            saleRepository.save(sale);
        }
    }
}
