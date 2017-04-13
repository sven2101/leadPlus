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
package dash.fileuploadmanagement.rest;

import java.io.IOException;
import java.util.Map;

import javax.validation.Valid;

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
import dash.fileuploadmanagement.business.HtmlToPdfService;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.fileuploadmanagement.business.PdfGenerationFailedException;
import dash.fileuploadmanagement.domain.FileUpload;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "File Resource")
@RequestMapping(value = "/api/rest/files")
@Api(value = "File API")
public class FileUploadResource {

	@Autowired
	private IFileUploadService fileService;

	@Autowired
	private HtmlToPdfService htmlToPdfService;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Post a file. ", notes = "")
	public FileUpload save(@ApiParam(required = true) @RequestBody @Valid final FileUpload fileUpload)
			throws SaveFailedException {
		return fileService.save(fileUpload);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Get a single file by id. ", notes = "")
	public FileUpload getFileUploadById(@ApiParam(required = true) @PathVariable final Long id)
			throws SaveFailedException, NotFoundException {
		return fileService.getById(id);
	}

	@RequestMapping(value = "/content/{id}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_PDF_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get file by Id. ", notes = "")
	public ResponseEntity<byte[]> getContentByFileUploadId(@ApiParam(required = true) @PathVariable final Long id)
			throws NotFoundException {
		FileUpload fileUpload = fileService.getById(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(
				new MediaType(fileUpload.getMimeType().split("/")[0], fileUpload.getMimeType().split("/")[1]));

		return new ResponseEntity<>(fileUpload.getContent(), responseHeaders, HttpStatus.OK);
	}

	@RequestMapping(value = "open/content/{id}", method = RequestMethod.GET, produces = {
			MediaType.APPLICATION_PDF_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get file by Id. ", notes = "")
	public ResponseEntity<byte[]> getContentByFileUploadNewTabId(@ApiParam(required = true) @PathVariable final Long id)
			throws NotFoundException {
		FileUpload fileUpload = fileService.getById(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(
				new MediaType(fileUpload.getMimeType().split("/")[0], fileUpload.getMimeType().split("/")[1]));

		return new ResponseEntity<>(fileUpload.getContent(), responseHeaders, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a file. ", notes = "")
	public void delete(@ApiParam(required = true) @PathVariable final long id) throws DeleteFailedException {
		fileService.delete(id);
	}

	@RequestMapping(value = "/generate/pdf", method = RequestMethod.POST, produces = {
			MediaType.APPLICATION_PDF_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "generate PDF", notes = "")
	public byte[] genereatePdfFromHtml(@RequestBody Map<String, String> json)
			throws PdfGenerationFailedException, IOException {
		

		return htmlToPdfService.genereatePdfFromHtml(json.get("htmlString"));

	}

}