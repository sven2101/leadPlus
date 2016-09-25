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
import static dash.Constants.OFFER_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.TEMPLATE_NOT_FOUND;
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
import dash.messagemanagement.domain.OfferMessage;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.domain.Process;
import dash.templatemanagement.domain.Template;

@Service
public class TemplateService implements ITemplateService {

	private static final Logger logger = Logger.getLogger(TemplateService.class);

	@Autowired
	private TemplateRepository templateRepository;

	@Autowired
	private IProcessService processService;

	@Override
	public List<Template> getAll() {
		return templateRepository.findAll();
	}

	@Override
	public Template save(final Template template) throws SaveFailedException {
		if (template != null) {
			try {
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

	@Override
	public Template update(final Template template) throws UpdateFailedException {
		if (template != null) {
			try {
				return save(template);
			} catch (SaveFailedException ex) {
				logger.error(ex.getMessage() + TemplateService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + TemplateService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public OfferMessage generate(final long templateId, final Process process) throws NotFoundException {
		if (process != null) {
			try {
				return new OfferMessage(process.getOffer(), getById(templateId).getContent());
			} catch (Exception ex) {
				logger.error(OFFER_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(OFFER_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(OFFER_NOT_FOUND);
			logger.error(OFFER_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	@Override
	public byte[] generatePdf(final long templateId, final Process process) throws NotFoundException {
		if (process != null) {
			try {
				return doIt("test", "test");
			} catch (Exception ex) {
				logger.error(OFFER_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(OFFER_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(OFFER_NOT_FOUND);
			logger.error(OFFER_NOT_FOUND + TemplateService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}

	public byte[] doIt(String file, String message) throws Exception {
		/*
		 * // Create a document and add a page to it PDDocument document = new
		 * PDDocument(); PDPage page = new PDPage(); document.addPage(page);
		 * 
		 * // Create a new font object selecting one of the PDF base fonts
		 * PDFont font = PDType1Font.HELVETICA_BOLD;
		 * 
		 * // Start a new content stream which will "hold" the to be created
		 * content PDPageContentStream contentStream = new
		 * PDPageContentStream(document, page);
		 * 
		 * // Define a text content stream using the selected font, moving the
		 * cursor and drawing the text "Hello World" contentStream.beginText();
		 * contentStream.setFont(font, 12);
		 * contentStream.moveTextPositionByAmount(100, 700);
		 * contentStream.drawString("Hello World"); contentStream.endText();
		 * 
		 * // Make sure that the content stream is closed:
		 * contentStream.close();
		 * 
		 * document.toString();
		 * 
		 * ByteArrayOutputStream out = new ByteArrayOutputStream(); try {
		 * document.save(out); document.close(); } catch (Exception ex) {
		 * logger.error(ex); }
		 * 
		 * return out.toByteArray();
		 */
		return null;
	}
}
