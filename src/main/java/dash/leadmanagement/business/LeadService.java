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

package dash.leadmanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.LEAD_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.domain.Lead;

@Service
public class LeadService implements ILeadService {

	private static final Logger logger = Logger.getLogger(LeadService.class);

	@Autowired
	private LeadRepository leadRepository;

	@Override
	public List<Lead> getAll() {
		return leadRepository.findAll();
	}

	@Override
	public Lead getLeadById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
				return leadRepository.findOne(id);
		} else {
			NotFoundException nfex = new NotFoundException(LEAD_NOT_FOUND);
			logger.error(LEAD_NOT_FOUND + LeadService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public Lead save(final Lead lead) throws SaveFailedException {
		if (Optional.ofNullable(lead).isPresent()) {
				return leadRepository.save(lead);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(LEAD_NOT_FOUND + LeadService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public Lead update(final Lead lead) throws UpdateFailedException {
		if (Optional.ofNullable(lead).isPresent()) {
			Lead updateLead;
			try {
				updateLead = getLeadById(lead.getId());
				updateLead.setContainer(lead.getContainer());
				updateLead.setContainerAmount(lead.getContainerAmount());
				updateLead.setDestination(lead.getDestination());
				updateLead.setInquirer(lead.getInquirer());
				updateLead.setMessage(lead.getMessage());
				updateLead.setTimestamp(lead.getTimestamp());
				updateLead.setVendor(lead.getVendor());
				return save(updateLead);
			} catch (IllegalArgumentException | SaveFailedException | NotFoundException ex) {
				logger.error(ex.getMessage() + LeadService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(LEAD_NOT_FOUND + LeadService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				leadRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(LEAD_NOT_FOUND + LeadService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(LEAD_NOT_FOUND + LeadService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

	@Override
	public Page<Lead> getPages(Pageable pageable) {
		return leadRepository.findAll(pageable);
	}
}
