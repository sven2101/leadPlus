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

	public void testSmtp(final long id, String smtpKey)
			throws NotFoundException, MessagingException, UnsupportedEncodingException, Exception;

	Smtp save(Smtp smpt, String smtpKey) throws SaveFailedException, UnsupportedEncodingException, Exception;

	Smtp findByUser(long id) throws NotFoundException;

	Smtp decrypt2(Smtp smtp) throws Exception;

	Smtp encrypt2(Smtp smtp) throws Exception;

}
