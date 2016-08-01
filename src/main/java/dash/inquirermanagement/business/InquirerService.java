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
package dash.inquirermanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.INQUIRER_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.inquirermanagement.domain.Inquirer;

@Service
public class InquirerService implements IInquirerService {

	private static final Logger logger = Logger.getLogger(InquirerService.class);

	@Autowired
	private InquirerRepository inquirerRepository;

	@Override
	public List<Inquirer> getAll() {
		return inquirerRepository.findAll();
	}

	@Override
	public Inquirer getInquirerById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return inquirerRepository.findOne(id);
		} else {
			NotFoundException nfex = new NotFoundException(INQUIRER_NOT_FOUND);
			logger.error(INQUIRER_NOT_FOUND + InquirerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public Inquirer save(final Inquirer inquirer) throws SaveFailedException {
		if (Optional.ofNullable(inquirer).isPresent()) {
			return inquirerRepository.save(inquirer);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(INQUIRER_NOT_FOUND + InquirerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Inquirer update(final Inquirer inquirer) throws UpdateFailedException {
		if (Optional.ofNullable(inquirer).isPresent()) {
			try {
				return save(inquirer);
			} catch (IllegalArgumentException | SaveFailedException ex) {
				logger.error(ex.getMessage() + InquirerService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(INQUIRER_NOT_FOUND + InquirerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				inquirerRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(INQUIRER_NOT_FOUND + InquirerService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(INQUIRER_NOT_FOUND + InquirerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

}
