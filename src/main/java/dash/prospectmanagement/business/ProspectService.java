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

package dash.prospectmanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.PROSPECT_NOT_FOUND;
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
import dash.prospectmanagement.domain.Prospect;

@Service
public class ProspectService implements IProspectService {

	private static final Logger logger = Logger.getLogger(ProspectService.class);

	@Autowired
	private ProspectRepository prospectRepository;

	@Override
	public List<Prospect> getAll() {
		return prospectRepository.findAll();
	}

	@Override
	public Prospect getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return prospectRepository.findOne(id);
		} else {
			NotFoundException nfex = new NotFoundException(PROSPECT_NOT_FOUND);
			logger.error(PROSPECT_NOT_FOUND + ProspectService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public Prospect save(final Prospect prospect) throws SaveFailedException {
		if (Optional.ofNullable(prospect).isPresent()) {
			return prospectRepository.save(prospect);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(PROSPECT_NOT_FOUND + ProspectService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Prospect update(final Prospect prospect) throws UpdateFailedException {
		if (Optional.ofNullable(prospect).isPresent()) {
			Prospect updateProspect;
			try {
				updateProspect = getById(prospect.getId());
				updateProspect.setAddress(prospect.getAddress());
				updateProspect.setCompany(prospect.getCompany());
				updateProspect.setEmail(prospect.getEmail());
				updateProspect.setFirstname(prospect.getFirstname());
				updateProspect.setLastname(prospect.getLastname());
				updateProspect.setPhone(prospect.getPhone());
				updateProspect.setTitle(prospect.getTitle());
				return save(updateProspect);
			} catch (IllegalArgumentException | NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + ProspectService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(PROSPECT_NOT_FOUND + ProspectService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				prospectRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(PROSPECT_NOT_FOUND + ProspectService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(PROSPECT_NOT_FOUND + ProspectService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

}
