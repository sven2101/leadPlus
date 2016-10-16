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
package dash.templatemanagement.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import dash.messagemanagement.domain.AbstractMessage;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.templatemanagement.business.ITemplateService;
import dash.templatemanagement.domain.Template;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Template Resource")
@RequestMapping(value = "/api/rest/templates", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.ALL_VALUE })
@Api(value = "Template API")
public class TemplateResource {

	@Autowired
	private ITemplateService templateService;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all templates. ", notes = "")
	public List<Template> getAll() {
		return templateService.getAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get template by Id. ", notes = "")
	public Template getById(@ApiParam(required = true) @PathVariable final long id) throws NotFoundException {
		return templateService.getById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Post a template. ", notes = "")
	public Template save(@ApiParam(required = true) @RequestBody @Valid final Template template) throws SaveFailedException {
		return templateService.save(template);
	}

	@ApiOperation(value = "Update a single template.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Template update(@ApiParam(required = true) @RequestBody @Valid final Template template) throws UpdateFailedException {
		return templateService.update(template);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a template. ", notes = "")
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		templateService.delete(id);
	}

	@RequestMapping(value = "/{templateId}/offers/generate", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Generate a email content based on a template and an offer.", notes = "")
	public AbstractMessage generate(@ApiParam(required = true) @PathVariable final Long templateId,
			@ApiParam(required = true) @RequestBody @Valid final Offer offer) throws NotFoundException {
		return templateService.generateOfferContent(templateId, offer);
	}

	@RequestMapping(value = "/{templateId}/offers/pdf/generate", method = RequestMethod.POST, produces = "application/pdf")
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Generate a pdf based on a template and an offer.", notes = "")
	public ResponseEntity<byte[]> generatePdf(@ApiParam(required = true) @PathVariable final Long templateId,
			@ApiParam(required = true) @PathVariable final long offerId, @ApiParam(required = true) @RequestBody @Valid final Process process)
			throws NotFoundException, IOException {

		FileInputStream fileStream;
		fileStream = new FileInputStream(new File("D://abc.pdf"));
		System.out.println("PDF: " + fileStream.toString());
		byte[] contents = IOUtils.toByteArray(fileStream);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/pdf"));
		String filename = "abc.pdf";
		headers.setContentDispositionFormData(filename, filename);
		fileStream.close();
		return new ResponseEntity<byte[]>(contents, headers, HttpStatus.OK);

	}

}