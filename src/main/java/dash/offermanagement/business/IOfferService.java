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

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.offermanagement.domain.Offer;

@Service
public interface IOfferService {

	public Page<Offer> getAll(Pageable pageable);

	public List<Offer> getAll();

	public Offer getOfferById(final Long id) throws NotFoundException;

	public Offer save(final Offer offer) throws SaveFailedException;

	public Offer update(final Offer offer) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

}
