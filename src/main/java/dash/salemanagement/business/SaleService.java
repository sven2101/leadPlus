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
