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
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import dash.messagemanagement.domain.AbstractMessage;
import dash.messagemanagement.domain.EmailMessage;
import dash.messagemanagement.domain.OfferMessage;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationType;
import dash.productmanagement.business.IProductService;
import dash.productmanagement.domain.OrderPosition;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.domain.User;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import dash.usermanagement.settings.language.Language;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class MessageService implements IMessageService {

	private static final Logger logger = Logger.getLogger(MessageService.class);

	private static final String PROCESS_INFO_TEMPLATE = "ProcessInfoTemplate.ftl";

	@Value("${hostname.suffix}")
	private String hostname;

	private Configuration freeMarkerDirectoryTemplatesConfigurer;
	private Configuration freeMarkerStringTemplatesConfigurer;
	private IProductService productService;

	@Autowired
	public MessageService(
			@Qualifier("freeMarkerDirectoryTemplatesConfigurer") Configuration freeMarkerDirectoryTemplatesConfigurer,
			@Qualifier("freeMarkerStringTemplatesConfigurer") Configuration freeMarkerStringTemplatesConfigurer,
			IProductService productService) {
		this.freeMarkerDirectoryTemplatesConfigurer = freeMarkerDirectoryTemplatesConfigurer;
		this.freeMarkerStringTemplatesConfigurer = freeMarkerStringTemplatesConfigurer;
		this.productService = productService;
	}

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
			final String templateWithPlaceholders, final Notification notification, final User user,
			final Long templateId) throws IOException, TemplateException {

		String message = getMessageContentString(workflowTemplateObject, templateWithPlaceholders, user, templateId);

		return new OfferMessage(notification.getRecipients(), notification.getSubject(), message,
				notification.getAttachments(), NotificationType.OFFER);
	}

	@Override
	public synchronized String getMessageContentString(final WorkflowTemplateObject workflowTemplateObject,

			final String templateWithPlaceholders, final User user, final Long templateId)
			throws IOException, TemplateException {

		final String randomId = UUID.randomUUID().toString();

		final StringTemplateLoader stringTemplateLoader = new StringTemplateLoader();
		freeMarkerStringTemplatesConfigurer.setTemplateLoader(stringTemplateLoader);

		stringTemplateLoader.putTemplate("template" + randomId, unescapeString(templateWithPlaceholders));
		Template template = freeMarkerStringTemplatesConfigurer.getTemplate("template" + randomId);

		Map<String, Object> mapping = new HashMap<>();

		for (OrderPosition orderPosition : workflowTemplateObject.getOrderPositions()) {
			orderPosition.setProduct(productService.getById(orderPosition.getProduct().getId()));
		}

		mapping.put("workflow", workflowTemplateObject);
		mapping.put("customer", workflowTemplateObject.getCustomer());
		mapping.put("orderPositions", workflowTemplateObject.getOrderPositions());
		if (user != null) {
			user.setPassword(null);
			mapping.put("user", user);
		}

		Writer writer = new StringWriter();
		template.process(mapping, writer);

		freeMarkerStringTemplatesConfigurer.removeTemplateFromCache("template" + randomId);
		return writer.toString();
	}

	private String unescapeString(String escapedString) {
		return escapedString.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&");
	}

	@Override
	public AbstractMessage getWelcomeMessage(String templateName, String tenant, User user) throws TemplateException {

		Template template;
		String message = "";
		String subject = "Welcome to lead+";

		try {
			template = freeMarkerDirectoryTemplatesConfigurer.getTemplate(templateName);
			Map<String, Object> mapping = new HashMap<>();
			if (user.getLanguage() == Language.DE)
				subject = "Willkommen bei lead+";
			mapping.put("tenant", tenant);
			mapping.put("user", user);

			Writer writer = new StringWriter();
			template.process(mapping, writer);
			message = writer.toString();
		} catch (IOException e) {
			logger.error(MessageService.class.getSimpleName(), e);
		}

		return new EmailMessage(user.getEmail(), subject, message, null, NotificationType.WELCOME);
	}

	@Override
	public AbstractMessage getForgotPasswordMessage(String templateName, Tenant tenant, User user,
			PasswordForgot passwordForgot) throws TemplateException {

		Template template;
		String message = "";
		String subject = "lead+ Forgot Password";
		try {
			template = freeMarkerDirectoryTemplatesConfigurer.getTemplate(templateName);
			Map<String, Object> mapping = new HashMap<>();
			if (user.getLanguage() == Language.DE)
				subject = "lead+ Passwort vergessen";
			mapping.put("tenant", tenant);
			mapping.put("passwordForgot", passwordForgot);
			mapping.put("user", user);
			mapping.put("hostname", this.hostname);

			Writer writer = new StringWriter();
			template.process(mapping, writer);
			message = writer.toString();
		} catch (IOException e) {
			logger.error(MessageService.class.getSimpleName(), e);
		}

		return new EmailMessage(user.getEmail(), subject, message, null, NotificationType.FORGOT_PASSWORD);
	}

	@Override
	public String exportProcessAsPDF(WorkflowTemplateObject workflowTemplateObject)
			throws TemplateException, IOException {
		Template template = freeMarkerDirectoryTemplatesConfigurer.getTemplate(PROCESS_INFO_TEMPLATE);
		Map<String, Object> mapping = new HashMap<>();
		mapping.put("workflow", workflowTemplateObject);
		Writer writer = new StringWriter();
		template.process(mapping, writer);
		return writer.toString();
	}

}
