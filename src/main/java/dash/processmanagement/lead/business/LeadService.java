package dash.processmanagement.lead.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.lead.domain.Lead;
import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.lead.vendor.VendorRepository;

@Service
public class LeadService implements ILeadService {

	@Autowired
	private LeadRepository leadRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public void createLead(Lead lead) {
		if (Optional.ofNullable(lead).isPresent()) {
			Vendor vendor = vendorRepository.findByName(lead.getVendor().getName());
			if (vendor == null) {
				vendorRepository.save(lead.getVendor());
			} else {
				lead.setVendor(vendor);
			}
			leadRepository.save(lead);
		}
	}
}
