package dash.salemanagement.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.salemanagement.domain.Sale;
import dash.vendormanagement.business.VendorRepository;
import dash.vendormanagement.domain.Vendor;

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
