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

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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

	public static final String PHANTOMJS_ROOT_DIR = "/phantomjs-2.1.1-windows";
	public static final String PHANTOMJS_CONFIG_FILE = PHANTOMJS_ROOT_DIR + "/phantomjs.config.js";
	public static final String PHANTOMJS_EXE = PHANTOMJS_ROOT_DIR + "/phantomjs.exe";
	public static final String TEMP_DIR = PHANTOMJS_ROOT_DIR + "/temp";

	@Autowired
	private IFileUploadService fileService;

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

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Delete a file. ", notes = "")
	public void delete(@ApiParam(required = true) @PathVariable final long id) throws DeleteFailedException {
		fileService.delete(id);
	}

	@RequestMapping(value = "/pdf", method = RequestMethod.POST, consumes = { MediaType.TEXT_HTML_VALUE }, produces = {
			MediaType.APPLICATION_PDF_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "generate PDF", notes = "")
	public byte[] genereatePdfFromHtml(@RequestBody String htmlString)
			throws PdfGenerationFailedException, IOException {

		int exitCode = 0;
		BufferedReader errorReader = null;
		InputStreamReader inputStreamReader = null;
		PrintWriter writer = null;
		File tempHtml = null;
		File tempPdf = null;
		String errorConsoleOutput = "";

		try {
			String tempDirUrl = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()
					+ TEMP_DIR;
			tempHtml = File.createTempFile("tempHtml", ".html", new File(tempDirUrl));
			writer = new PrintWriter(tempHtml);
			writer.print(htmlString);
			writer.close();

			String configFileUrl = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()
					+ PHANTOMJS_CONFIG_FILE;
			File configFile = Paths.get(new URI("file:" + configFileUrl)).toFile();

			tempPdf = File.createTempFile("tempPdf", ".pdf", new File(tempDirUrl));

			String exeUrl = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()
					+ PHANTOMJS_EXE;
			ProcessBuilder renderProcess = new ProcessBuilder(exeUrl, configFile.getAbsolutePath(),
					tempHtml.getAbsolutePath(), tempPdf.getAbsolutePath());
			Process phantom = renderProcess.start();
			exitCode = phantom.waitFor();
			/*
			 * BufferedReader debugReader = new BufferedReader(new
			 * InputStreamReader(phantom.getInputStream())); StringBuilder
			 * debugBuilder = new StringBuilder(); String debugLine = null;
			 * while ((debugLine = debugReader.readLine()) != null) {
			 * debugBuilder.append(debugLine);
			 * debugBuilder.append(System.getProperty("line.separator")); }
			 * String debugConsoleOutput = debugBuilder.toString();
			 */
			inputStreamReader = new InputStreamReader(phantom.getErrorStream());
			errorReader = new BufferedReader(inputStreamReader);
			StringBuilder errorBuilder = new StringBuilder();
			String errorLine = null;
			while ((errorLine = errorReader.readLine()) != null) {
				errorBuilder.append(errorLine);
				errorBuilder.append(System.getProperty("line.separator"));
			}
			errorConsoleOutput = errorBuilder.toString();

			Path path = Paths.get(tempPdf.getAbsolutePath());
			return Files.readAllBytes(path);
		} catch (Exception e) {
			if (exitCode != 0) {
				throw new PdfGenerationFailedException("PdfGenerator exited with Code " + exitCode);
			}
			throw new PdfGenerationFailedException("PdfGenerator exited" + errorConsoleOutput);
		} finally {
			if (inputStreamReader != null) {
				inputStreamReader.close();
			}
			if (errorReader != null) {
				errorReader.close();
			}
			if (writer != null) {
				writer.close();
			}
			if (tempHtml != null) {
				tempHtml.delete();
			}
			if (tempPdf != null) {
				tempPdf.delete();
			}
		}

	}

}