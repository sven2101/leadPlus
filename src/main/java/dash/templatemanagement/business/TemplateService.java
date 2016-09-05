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
package dash.templatemanagement.business;

import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.TEMPLATE_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.templatemanagement.domain.Template;

@Service
public class TemplateService implements ITemplateService {

	private static final Logger logger = Logger.getLogger(TemplateService.class);

	@Autowired
	private TemplateRepository templateRepository;

	@Override
	public List<Template> getAll() {
		return templateRepository.findAll();
	}

	@Override
	public Template save(final Template template) throws SaveFailedException {
		if (template != null) {
			try {
				System.out.println("Template" + template);
				return templateRepository.save(template);
			} catch (Exception ex) {
				logger.error(TemplateService.class.getSimpleName() + ex.getMessage(), ex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(TEMPLATE_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public void delete(final long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				templateRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(TEMPLATE_NOT_FOUND + TemplateService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(TEMPLATE_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}

	}

	@Override
	public Template getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return templateRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(TEMPLATE_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(TEMPLATE_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(TEMPLATE_NOT_FOUND);
			logger.error(TEMPLATE_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	//	public File getEmailTemplateById(final long id) throws NotFoundException {
	//
	//		StringTemplateLoader stringLoader = new StringTemplateLoader();
	//		String firstTemplate = "firstTemplate";
	//		stringLoader.putTemplate(firstTemplate, freemarkerTemplate);
	//		Configuration cfg = new Configuration();
	//		cfg.setTemplateLoader(stringLoader);
	//		Template template = cfg.getTemplate(firstTemplate);
	//
	//	}

}
