/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.leadmanagement.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.leadmanagement.domain.Lead;
import dash.vendormanagement.business.VendorRepository;
import dash.vendormanagement.domain.Vendor;

@Service
public class LeadService implements ILeadService {

	@Autowired
	private LeadRepository leadRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public Lead createLead(Lead lead) {
		if (Optional.ofNullable(lead).isPresent()) {
			Vendor vendor = vendorRepository.findByName(lead.getVendor().getName());
			if (!Optional.ofNullable(lead).isPresent()) {
				vendorRepository.save(lead.getVendor());
			} else {
				lead.setVendor(vendor);
			}
			return leadRepository.save(lead);
		}
		return null;
	}
}
