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
package dash.vendormanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.VENDOR_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.VendorNotFoundException;
import dash.vendormanagement.domain.Vendor;

@Service
public class VendorService implements IVendorService {

	private static final Logger logger = Logger.getLogger(VendorService.class);

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public Vendor update(Vendor vendor) throws VendorNotFoundException {
		if (Optional.ofNullable(vendor).isPresent()) {
			Vendor updateVendor;
			try {
				updateVendor = vendorRepository.findOne(vendor.getId());
				updateVendor.setName(vendor.getName());
				updateVendor.setPhone(vendor.getPhone());
				return vendorRepository.save(updateVendor);
			} catch (IllegalArgumentException iaex) {
				logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, iaex);
				throw new VendorNotFoundException(VENDOR_NOT_FOUND);
			}
		} else {
			VendorNotFoundException vnfex = new VendorNotFoundException(VENDOR_NOT_FOUND);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, vnfex);
			throw vnfex;
		}
	}

	@Override
	public List<Vendor> getAll() {
		return vendorRepository.findAll();
	}

	@Override
	public Vendor getById(Long id) throws VendorNotFoundException {
		try {
			return vendorRepository.findOne(id);
		} catch (IllegalArgumentException iaex) {
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, iaex);
			throw new VendorNotFoundException(VENDOR_NOT_FOUND);
		}
	}

	@Override
	public Vendor save(Vendor vendor) throws VendorNotFoundException {
		if (Optional.ofNullable(vendor).isPresent()) {
			try {
				return vendorRepository.save(vendor);
			} catch (IllegalArgumentException iaex) {
				logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, iaex);
				throw new VendorNotFoundException(VENDOR_NOT_FOUND);
			}
		} else {
			VendorNotFoundException vnfex = new VendorNotFoundException(VENDOR_NOT_FOUND);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, vnfex);
			throw vnfex;
		}
	}

	@Override
	public void delete(Vendor vendor) throws VendorNotFoundException {
		if (Optional.ofNullable(vendor).isPresent()) {
			try {
				vendorRepository.delete(vendor);
			} catch (IllegalArgumentException iaex) {
				logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, iaex);
				throw new VendorNotFoundException(VENDOR_NOT_FOUND);
			}
		} else {
			VendorNotFoundException vnfex = new VendorNotFoundException(VENDOR_NOT_FOUND);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, vnfex);
			throw vnfex;
		}
	}
}
