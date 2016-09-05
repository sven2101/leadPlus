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

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.FILE_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.filemanagement.domain.File;

@Service
public class FileService implements IFileService {

	private static final Logger logger = Logger.getLogger(FileService.class);

	@Autowired
	private FileRepository fileRepository;

	@Override
	public File save(final MultipartFile multipartFile) throws SaveFailedException {
		if (multipartFile != null) {
			try {

				File file = new File();
				file.setName(multipartFile.getOriginalFilename());
				file.setDescription("");
				file.setContent(multipartFile.getBytes());
				file.setSize(multipartFile.getSize());
				file.setMimeType(multipartFile.getContentType());
				file.setSize(multipartFile.getSize());
				file.setDeaktiviert(false);

				return fileRepository.save(file);
			} catch (Exception ex) {
				logger.error(FileService.class.getSimpleName() + ex.getMessage(), ex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else

		{
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public void delete(final long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				fileRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}

	}

	@Override
	public File getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return fileRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(FILE_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(FILE_NOT_FOUND);
			logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public File saveEmailTemplate(final MultipartFile multipartFile) throws SaveFailedException {
		if (multipartFile != null) {
			try {

				File file = new File();
				file.setName(multipartFile.getOriginalFilename());
				file.setDescription("Template");
				file.setContent(multipartFile.getBytes());
				file.setSize(multipartFile.getSize());
				file.setMimeType(multipartFile.getContentType());
				file.setSize(multipartFile.getSize());
				file.setDeaktiviert(false);

				System.out.println("File" + file.toString());
				return fileRepository.save(file);
			} catch (Exception ex) {
				logger.error(FileService.class.getSimpleName() + ex.getMessage(), ex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(FILE_NOT_FOUND + FileService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

}
