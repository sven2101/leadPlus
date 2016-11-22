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

package dash.attachmentmanagement.business;

import static dash.Constants.ATTACHMENT_NOT_FOUND;
import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.attachmentmanagement.domain.Attachment;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;

@Service
public class AttachmentService implements IAttachmentService {

	private static final Logger logger = Logger.getLogger(AttachmentService.class);

	@Autowired
	private AttachmentRepository attachmentRepository;

	@Override
	public Attachment save(Attachment attachment) throws SaveFailedException {
		if (attachment != null) {
			return attachmentRepository.save(attachment);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + AttachmentService.class.getSimpleName());
			throw sfex;
		}
	}

	@Override
	public Attachment getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return attachmentRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(ATTACHMENT_NOT_FOUND + AttachmentService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, ex);
				throw new NotFoundException(ATTACHMENT_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(ATTACHMENT_NOT_FOUND);
			logger.error(ATTACHMENT_NOT_FOUND + AttachmentService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}
}
