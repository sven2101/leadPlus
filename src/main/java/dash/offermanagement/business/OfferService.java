package dash.offermanagement.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.offermanagement.domain.Offer;
import dash.vendormanagement.business.VendorRepository;
import dash.vendormanagement.domain.Vendor;

@Service
public class OfferService implements IOfferService {

	@Autowired
	private OfferRepository offerRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public void createOffer(Offer offer) {
		if (Optional.ofNullable(offer).isPresent()) {
			Vendor vendor = vendorRepository.findByName(offer.getVendor().getName());
			if (vendor == null) {
				vendorRepository.save(offer.getVendor());
			} else {
				offer.setVendor(vendor);
			}
			offerRepository.save(offer);
		}
	}
}
