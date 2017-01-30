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

package dash.smtpmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.io.UnsupportedEncodingException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.common.EncryptionWrapper;
import dash.common.Encryptor;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.domain.User;

@Service
public class SmtpService implements ISmtpService {

	private static final Logger logger = Logger.getLogger(SmtpService.class);

	@Autowired
	private SmtpRepository smptRepository;

	@Override
	public Smtp save(final Smtp smtp, final String smtpKey) throws SaveFailedException {
		SaveFailedException sfex = null;
		UnsupportedEncodingException ueex = null;
		Exception ex = null;

		if (smtp == null)
			sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);

		try {
			if (smtp.getPassword() == null || new String(smtp.getPassword(), "UTF-8") == "") {
				Smtp tempSmpt = smptRepository.findOne(smtp.getId());
				smtp.setPassword(tempSmpt.getPassword());
				smtp.setSalt(tempSmpt.getSalt());
				smtp.setIv(tempSmpt.getIv());
			} else {
				EncryptionWrapper encryptionWrapper = Encryptor.encrypt(smtp.getPassword(), smtpKey);
				smtp.setPassword(encryptionWrapper.getCiphertext());
				smtp.setSalt(encryptionWrapper.getSalt());
				smtp.setIv(encryptionWrapper.getIv());
			}
			return smptRepository.save(smtp);
		} catch (UnsupportedEncodingException e1) {
			ueex = e1;
		} catch (Exception e2) {
			ex = e2;
		}

		if (sfex != null || ueex != null || ex != null) {
			logger.error(SAVE_FAILED_EXCEPTION + SmtpService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
		return null;

	}

	@Override
	public Smtp findByUser(final User user) throws NotFoundException {
		return smptRepository.findByUser(user);
	}

}
