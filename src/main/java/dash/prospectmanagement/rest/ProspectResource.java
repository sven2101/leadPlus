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

package dash.prospectmanagement.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.base.Optional;

import dash.prospectmanagement.business.ProspectRepository;
import dash.prospectmanagement.domain.Prospect;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/rest/processes/offers/prospects")
@Api(value = "Prospects API")
public class ProspectResource {

	@Autowired
	private ProspectRepository prospectRepository;

	@RequestMapping(method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Prospects", notes = "")
	public Iterable<Prospect> get() {
		return prospectRepository.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a single prospect.", notes = "You have to provide a valid prospect ID.")
	public Prospect findById(@ApiParam(required = true) @PathVariable Long id) {
		return prospectRepository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Update a single prospect.", notes = "You have to provide a valid prospect ID.")
	public Prospect update(@ApiParam(required = true) @PathVariable Long id, @ApiParam(required = true) @RequestBody @Valid Prospect updateProspect) {
		Prospect prospect = prospectRepository.findOne(id);
		if (Optional.fromNullable(prospect).isPresent()) {
			prospect.setFirstname(updateProspect.getFirstname());
			prospect.setLastname(updateProspect.getLastname());
			prospect.setCompany(updateProspect.getCompany());
			prospect.setEmail(updateProspect.getEmail());
			prospect.setPhone(updateProspect.getPhone());
			prospect.setTitle(updateProspect.getTitle());
		}
		return prospect;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete a single prospect.", notes = "You have to provide a valid prospect ID.")
	public void delete(@ApiParam(required = true) @PathVariable Long id) {
		prospectRepository.delete(id);
	}
}
