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
package dash.filemanagement.business;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.filemanagement.domain.File;

@Service
public interface IFileService {

	public File save(final MultipartFile multipartFile) throws SaveFailedException;

	public void delete(final long id) throws DeleteFailedException;

	public File getById(final long id) throws NotFoundException;

	public File saveEmailTemplate(final MultipartFile multipartFile) throws SaveFailedException;

}
