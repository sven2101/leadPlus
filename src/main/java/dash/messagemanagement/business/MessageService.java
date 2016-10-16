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
import dash.offermanagement.domain.Offer;
import dash.usermanagement.domain.User;
import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class MessageService implements IMessageService {

	@Autowired
	private Configuration cfg;

	@Autowired
	private StringTemplateLoader stringTemplateLoader;

	@Override
	public String getRecipient() {
		return null;
	}

	@Override
	public String getSubject() {
		return "Angebot";
	}

	@Override
	public AbstractMessage getOfferContent(final Offer offer, final String templateWithPlaceholders)
			throws IOException, NotFoundException, TemplateException {

		cfg.setTemplateLoader(stringTemplateLoader);
		stringTemplateLoader.putTemplate("template", unescapeString(templateWithPlaceholders));

		Template template = cfg.getTemplate("template");

		Map<String, Object> mapping = new HashMap<>();

		mapping.put("offer", offer);
		mapping.put("customer", offer.getCustomer());
		mapping.put("orderPositions", offer.getOrderPositions());
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user != null)
			mapping.put("user", user);

		Writer writer = new StringWriter();
		template.process(mapping, writer);

		return new OfferMessage("xxx", "yyy", writer.toString(), null);
	}

	private String unescapeString(String escapedString) {
		return escapedString.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
	}

}
