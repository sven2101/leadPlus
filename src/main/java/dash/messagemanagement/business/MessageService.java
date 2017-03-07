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
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.messagemanagement.domain.AbstractMessage;
import dash.messagemanagement.domain.OfferMessage;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.usermanagement.domain.User;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class MessageService implements IMessageService {

	@Autowired
	private Configuration cfg;

	@Override
	public String getRecipient() {
		return null;
	}

	@Override
	public String getSubject() {
		return "Angebot";
	}

	@Override
	public AbstractMessage getMessageContent(final WorkflowTemplateObject workflowTemplateObject,
			final String templateWithPlaceholders, final Notification notification)
			throws IOException, TemplateException {

		final StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
		cfg.setTemplateLoader(stringTemplateLoader);
		cfg.setLocale(java.util.Locale.GERMANY);
		stringTemplateLoader.putTemplate("template", unescapeString(templateWithPlaceholders));
		Template template = cfg.getTemplate("template");

		Map<String, Object> mapping = new HashMap<>();

		mapping.put("workflow", workflowTemplateObject);
		mapping.put("customer", workflowTemplateObject.getCustomer());
		mapping.put("orderPositions", workflowTemplateObject.getOrderPositions());

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user != null) {
			user.setPassword(null);
			mapping.put("user", user);
		}

		Writer writer = new StringWriter();
		template.process(mapping, writer);

		return new OfferMessage(notification.getRecipients(), notification.getSubject(), writer.toString(),
				notification.getAttachments(), NotificationType.OFFER);
	}

	private String unescapeString(String escapedString) {
		return escapedString.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
	}

	@Override
	public AbstractMessage getMessage(Template template) throws IOException, NotFoundException, TemplateException {
		Map<String, Object> mapping = new HashMap<>();

		mapping.put("workflow", workflowTemplateObject);
		mapping.put("customer", workflowTemplateObject.getCustomer());
		mapping.put("orderPositions", workflowTemplateObject.getOrderPositions());

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user != null) {
			user.setPassword(null);
			mapping.put("user", user);
		}

		Writer writer = new StringWriter();
		template.process(mapping, writer);

		return new OfferMessage(notification.getRecipients(), notification.getSubject(), writer.toString(),
				notification.getAttachments(), NotificationType.OFFER);
		return null;
	}

}
