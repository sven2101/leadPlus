package dash.processmanagement.offer.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;
import dash.processmanagement.offer.domain.Offer;

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
