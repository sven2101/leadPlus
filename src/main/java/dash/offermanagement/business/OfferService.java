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
	public Offer createOffer(Offer offer) {
		if (Optional.ofNullable(offer).isPresent()) {
			Vendor vendor = vendorRepository.findByName(offer.getVendor().getName());
			if (!Optional.ofNullable(vendor).isPresent()) {
				vendorRepository.save(offer.getVendor());
			} else {
				offer.setVendor(vendor);
			}
			return offerRepository.save(offer);
		}
		return null;
	}
}
