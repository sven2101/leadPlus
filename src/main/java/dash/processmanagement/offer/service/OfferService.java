package dash.processmanagement.offer.service;

import java.util.Optional;

import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.offer.Offer;
import dash.processmanagement.offer.OfferRepository;
import dash.processmanagement.offer.prospect.ProspectRepository;

@Service
public class OfferService implements IOfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private ProspectRepository prospectRepository;

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
