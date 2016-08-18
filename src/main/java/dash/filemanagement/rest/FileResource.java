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
package dash.filemanagement.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import dash.filemanagement.business.FileRepository;
import dash.filemanagement.domain.File;

@RequestMapping(value = "/files", method = RequestMethod.POST)
@RestController
public class FileResource {

	@Autowired
	private FileRepository fileRepository;

	@RequestMapping(method = RequestMethod.POST)
	public String handleFileUpload(@RequestParam CommonsMultipartFile file) throws Exception {

		if (file != null) {
			System.out.println("Saving file: " + file.getOriginalFilename());
			File uploadFile = new File();
			uploadFile.setName(file.getOriginalFilename());
			uploadFile.setContent(file.getBytes());
			fileRepository.save(uploadFile);
		}

		return "Success";
	}
}