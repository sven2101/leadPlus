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

package dash.offermanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.offermanagement.business.IOfferService;
import dash.offermanagement.domain.Offer;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Offer Resource")
@RequestMapping(value = "/api/rest/offers", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Offers API")
public class OfferResource {

	@Autowired
	private IOfferService offerService;

	@ApiOperation(value = "Returns all offers.")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getAll() {
		return offerService.getAll();
	}

	@ApiOperation(value = "Return a single offer.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer getOfferById(@PathVariable final long id) throws NotFoundException {
		return offerService.getOfferById(id);
	}

	@ApiOperation(value = "Save a single offer.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Offer save(@ApiParam(required = true) @RequestBody @Valid Offer offer) throws SaveFailedException, NotFoundException {
		return offerService.save(offer);
	}

	@ApiOperation(value = "Update a single offer.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Offer update(@ApiParam(required = true) @RequestBody @Valid Offer offer) throws UpdateFailedException {
		return offerService.update(offer);
	}

	@ApiOperation(value = "Delete a single offer.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final long id) throws DeleteFailedException {
		offerService.delete(id);
	}

	@ApiOperation(value = "Return customers offers.", notes = "")
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Offer> getByCustomer(@ApiParam(required = true) @PathVariable final long id) {
		return offerService.getByCustomer(id);
	}

	@ApiOperation(value = "Generate a single offer file.", notes = "")
	@RequestMapping(value = "/{offerId}/files/templates/{templateId}/generate", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer generateOfferFile(@PathVariable final long offerId, @PathVariable final long templateId) throws NotFoundException {
		return offerService.generateOfferFile(offerId, templateId);
	}

	@ApiOperation(value = "Send an offer to a customer.", notes = "")
	@RequestMapping(value = "/{id}/send", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Offer sendOffer(@PathVariable final long id) throws NotFoundException {
		return offerService.sendOffer(id, SecurityContextHolder.getContext().getAuthentication().getName());
	}
}
