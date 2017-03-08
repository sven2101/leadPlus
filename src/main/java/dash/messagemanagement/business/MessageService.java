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
import java.io.InputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.apache.pdfbox.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import dash.messagemanagement.domain.AbstractMessage;
import dash.messagemanagement.domain.EmailMessage;
import dash.messagemanagement.domain.OfferMessage;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.domain.User;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class MessageService implements IMessageService {

	private static final Logger logger = Logger.getLogger(MessageService.class);

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
			throws TemplateException, IOException {

		final StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
		cfg.setTemplateLoader(stringTemplateLoader);
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
	public AbstractMessage getWelcomeMessage(String templateName, Tenant tenant, User user) throws TemplateException {
		InputStream inputStreamEmployee = this.getClass().getResourceAsStream("/email/images/Andreas_Foitzik.png");
		InputStream inputStreamLogo = this.getClass().getResourceAsStream("/email/images/logo.png");

		String imgAsBase64Employee = null;
		String imgAsBase64Logo = null;

		try {
			byte[] imgBytesEmployee = IOUtils.toByteArray(inputStreamEmployee);
			byte[] imgBytesLogo = IOUtils.toByteArray(inputStreamLogo);

			byte[] imgBytesAsBase64Employee = Base64.encodeBase64(imgBytesEmployee);
			byte[] imgBytesAsBase64Logo = Base64.encodeBase64(imgBytesLogo);

			String imgDataAsBase64Employee = new String(imgBytesAsBase64Employee);
			String imgDataAsBase64Logo = new String(imgBytesAsBase64Logo);

			imgAsBase64Employee = "data:image/png;base64," + imgDataAsBase64Employee;
			imgAsBase64Logo = "data:image/png;base64," + imgDataAsBase64Logo;
		} catch (IOException e) {
			logger.error(MessageService.class.getSimpleName(), e);
		}

		Template template;
		String message = "";
		try {
			template = cfg.getTemplate(templateName);
			Map<String, Object> mapping = new HashMap<>();
			user.setPassword(null);
			mapping.put("tenant", tenant);
			mapping.put("user", user);
			if (imgAsBase64Employee != null)
				mapping.put("imgAsBase64Employee", imgAsBase64Employee);
			if (imgAsBase64Logo != null)
				mapping.put("imgAsBase64Logo", imgAsBase64Logo);

			Writer writer = new StringWriter();
			template.process(mapping, writer);
			message = writer.toString();
		} catch (IOException e) {
			logger.error(MessageService.class.getSimpleName(), e);
		}

		return new EmailMessage(user.getEmail(), "Welcome to lead+", message, null, NotificationType.WELCOME);
	}

}
