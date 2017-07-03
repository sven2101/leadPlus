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

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.fileuploadmanagement.business.PdfGenerationFailedException;
import dash.messagemanagement.domain.AbstractMessage;
import dash.notificationmanagement.domain.Notification;
import dash.templatemanagement.domain.Template;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.usermanagement.domain.User;
import freemarker.template.TemplateException;

@Service
public interface ITemplateService {

	public List<Template> getAll();

	public Template getById(final long id) throws NotFoundException;

	public Template save(final Template template) throws SaveFailedException, ConsistencyFailedException;

	public void delete(final long id) throws DeleteFailedException;

	public AbstractMessage getMessageContent(long templateId, WorkflowTemplateObject workflowTemplateObject,
			final Notification notification, final User user)
			throws NotFoundException, IOException, TemplateCompilationException;

	AbstractMessage getMessageContentByTemplate(Template template, WorkflowTemplateObject workflowTemplateObject,
			Notification notification, final User user)
			throws NotFoundException, IOException, TemplateCompilationException;

	String getMessageContentStringByTemplateId(long templateId, WorkflowTemplateObject workflowTemplateObject,
			User user) throws NotFoundException, IOException, TemplateException, TemplateCompilationException;

	byte[] getPdfBytemplateId(long templateId, WorkflowTemplateObject workflowTemplateObject, User user)
			throws NotFoundException, IOException, TemplateCompilationException, PdfGenerationFailedException,
			TemplateException;

	byte[] exportProcessAsPDF(WorkflowTemplateObject workflowTemplateObject, final User user)
			throws TemplateException, IOException, PdfGenerationFailedException;

	String getMessageContentStringByTemplate(Template template, WorkflowTemplateObject workflowTemplateObject,
			User user) throws NotFoundException, IOException, TemplateException, TemplateCompilationException;

	byte[] getPdfBytemplate(Template template, WorkflowTemplateObject workflowTemplateObject, User user)
			throws NotFoundException, IOException, TemplateCompilationException, PdfGenerationFailedException,
			TemplateException;

}
