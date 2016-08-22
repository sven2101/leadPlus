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
package dash.notificationmanagement.domain;

import java.io.StringWriter;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;

public class TemplateRenderer {
	private static Configuration configuration = new Configuration(Configuration.VERSION_2_3_23);

	static {
		configuration.setClassForTemplateLoading(TemplateRenderer.class, "/templates");
	}

	private String templateName;

	public TemplateRenderer(String templateName) {
		this.templateName = templateName;
	}

	public String render(Map<String, Object> vars) throws Exception {
		Template template = configuration.getTemplate(templateName);
		StringWriter sw = new StringWriter();
		template.process(vars, sw);
		return sw.toString();
	}
}
