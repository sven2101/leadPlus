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

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Smtp;

@Service
public interface ISmtpService {

	public boolean test(final Smtp smtp);

	Smtp save(Smtp smpt) throws SaveFailedException;

	Smtp findByUser(long id) throws NotFoundException;
}
