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

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.SaveFailedException;
import dash.fileuploadmanagement.business.IFileUploadService;
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

	//	@RequestMapping(method = RequestMethod.POST)
	//	@ResponseStatus(HttpStatus.CREATED)
	//	@ApiOperation(value = "Post a file. ", notes = "")
	//	public FileUpload save(@RequestParam("file") MultipartFile file) throws SaveFailedException {
	//		return fileService.save(file);
	//	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Post a file. ", notes = "")
	public ResponseEntity save(MultipartHttpServletRequest request) throws SaveFailedException {

		try {
			Iterator<String> itr = request.getFileNames();

			while (itr.hasNext()) {
				String uploadedFile = itr.next();
				MultipartFile file = request.getFile(uploadedFile);
				String mimeType = file.getContentType();
				String filename = file.getOriginalFilename();
				byte[] bytes = file.getBytes();

				FileUpload newFile = new FileUpload();
				newFile.setMimeType(mimeType);
				newFile.setFilename(filename);
				newFile.setContent(bytes);
				//fileService.save(newFile);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("{}", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>("{}", HttpStatus.OK);

	}

	//	@RequestMapping(method = RequestMethod.POST)
	//	@ResponseStatus(HttpStatus.CREATED)
	//	@ApiOperation(value = "Post a file. ", notes = "")
	//	public FileUpload save(@RequestParam("file") MultipartFile file) throws SaveFailedException {
	//		return fileService.save(file);
	//	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get file by Id. ", notes = "")
	public void doDownload(HttpServletRequest request, HttpServletResponse response) throws IOException {

		// get absolute path of the application
		ServletContext context = request.getServletContext();
		String appPath = context.getRealPath("");
		System.out.println("appPath = " + appPath);

		// construct the complete absolute path of the file
		String fullPath = "D://abc.pdf";
		File downloadFile = new File(fullPath);
		FileInputStream inputStream = new FileInputStream(downloadFile);

		// get MIME type of the file
		String mimeType = context.getMimeType(fullPath);
		if (mimeType == null) {
			// set to binary type if MIME mapping not found
			mimeType = "application/octet-stream";
		}
		System.out.println("MIME type: " + mimeType);

		// set content attributes for the response
		response.setContentType(mimeType);
		response.setContentLength((int) downloadFile.length());

		// set headers for the response
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
		response.setHeader(headerKey, headerValue);

		// get output stream of the response
		OutputStream outStream = response.getOutputStream();

		byte[] buffer = new byte[4096];
		int bytesRead = -1;

		// write bytes read from the input stream into the output stream
		while ((bytesRead = inputStream.read(buffer)) != -1) {
			outStream.write(buffer, 0, bytesRead);
		}

		inputStream.close();
		outStream.close();

	}
	//	public ResponseEntity getById(@ApiParam(required = true) @PathVariable final long id) throws NotFoundException {
	//
	//		FileUpload fileUpload = fileService.getById(id);
	//
	//		// No file found based on the supplied filename
	//		if (fileUpload == null) {
	//			return new ResponseEntity<>("{}", HttpStatus.NOT_FOUND);
	//		}
	//
	//		// Generate the http headers with the file properties
	//		HttpHeaders headers = new HttpHeaders();
	//		headers.add("content-disposition", "attachment; filename=" + fileUpload.getFilename());
	//
	//		// Split the mimeType into primary and sub types
	//		String primaryType, subType;
	//		try {
	//			primaryType = fileUpload.getMimeType().split("/")[0];
	//			subType = fileUpload.getMimeType().split("/")[1];
	//		} catch (IndexOutOfBoundsException | NullPointerException ex) {
	//			return new ResponseEntity<>("{}", HttpStatus.INTERNAL_SERVER_ERROR);
	//		}
	//
	//		headers.setContentType(new MediaType(primaryType, subType));
	//
	//		return new ResponseEntity<>(fileUpload.getContent(), headers, HttpStatus.OK);
	//	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a file. ", notes = "")
	public void delete(@ApiParam(required = true) @PathVariable final long id) throws DeleteFailedException {
		fileService.delete(id);
	}

}