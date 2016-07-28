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

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.VendorNotFoundException;
import dash.vendormanagement.domain.Vendor;

@Service
public interface IVendorService {

	public List<Vendor> getAll();

	public Vendor getById(Long id) throws VendorNotFoundException;

	public Vendor save(final Vendor vendor) throws VendorNotFoundException;

	public Vendor update(final Vendor vendor) throws VendorNotFoundException;

	public void delete(final Vendor vendor) throws VendorNotFoundException;
}
