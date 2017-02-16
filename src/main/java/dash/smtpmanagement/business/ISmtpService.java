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

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Smtp;

@Service
public interface ISmtpService {

	public Smtp save(final Smtp smtp, final String smtpKey)
			throws SaveFailedException, UnsupportedEncodingException, Exception;

	public Smtp test(final Long smtpId, final String smtpKey)
			throws UnsupportedEncodingException, MessagingException, NotFoundException, Exception;

	public Smtp findByAuthenticatedUser() throws NotFoundException;

	Smtp findByUserId(long userId) throws NotFoundException;

}
