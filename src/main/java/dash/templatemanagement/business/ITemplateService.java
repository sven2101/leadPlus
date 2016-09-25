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

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.messagemanagement.domain.OfferMessage;
import dash.processmanagement.domain.Process;
import dash.templatemanagement.domain.Template;

@Service
public interface ITemplateService {

	public List<Template> getAll();

	public Template getById(final long id) throws NotFoundException;

	public Template save(final Template template) throws SaveFailedException;

	public void delete(final long id) throws DeleteFailedException;

	public Template update(final Template template) throws UpdateFailedException;

	public OfferMessage generate(final long templateId, final Process process) throws NotFoundException;

	public byte[] generatePdf(final long templateId, final Process process) throws NotFoundException;

}
