package dash.processmanagement.sale.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;
import dash.processmanagement.sale.domain.Sale;

@Service
public class SaleService implements ISaleService {

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public void createSale(Sale sale) {
		if (Optional.ofNullable(sale).isPresent()) {
			Vendor vendor = vendorRepository.findByName(sale.getVendor().getName());
			if (vendor == null) {
				vendorRepository.save(sale.getVendor());
			} else {
				sale.setVendor(vendor);
			}
			saleRepository.save(sale);
		}
	}
}
