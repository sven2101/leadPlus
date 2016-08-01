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
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.VENDOR_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.vendormanagement.domain.Vendor;

@Service
public class VendorService implements IVendorService {

	private static final Logger logger = Logger.getLogger(VendorService.class);

	@Autowired
	private VendorRepository vendorRepository;

	@Override
	public List<Vendor> getAll() {
		return vendorRepository.findAll();
	}

	@Override
	public Vendor getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return vendorRepository.findOne(id);
		} else {
			NotFoundException vnfex = new NotFoundException(VENDOR_NOT_FOUND);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, vnfex);
			throw vnfex;
		}
	}

	@Override
	public Vendor update(Vendor vendor) throws UpdateFailedException {
		if (Optional.ofNullable(vendor).isPresent()) {
			try {
				return save(vendor);
			} catch (IllegalArgumentException | SaveFailedException ex) {
				logger.error(ex.getMessage() + VendorService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public Vendor save(Vendor vendor) throws SaveFailedException {
		if (Optional.ofNullable(vendor).isPresent()) {
			return vendorRepository.save(vendor);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				vendorRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(VENDOR_NOT_FOUND + VendorService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}
}
