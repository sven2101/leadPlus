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

package dash.messagemanagement.business;

import java.io.IOException;

import dash.messagemanagement.domain.AbstractMessage;
import dash.notificationmanagement.domain.Notification;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.domain.User;
import freemarker.template.TemplateException;

public interface IMessageService {

	String getRecipient();

	String getSubject();

	AbstractMessage getMessageContent(final WorkflowTemplateObject workflowTemplateObject,

			String templateWithPlaceholders, final Notification notification, final User user)
			throws IOException, TemplateException;

	AbstractMessage getWelcomeMessage(String templateName, Tenant tenant, User user) throws TemplateException;

}
