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

import dash.filemanagement.domain.File;
import dash.offermanagement.domain.Offer;
import freemarker.cache.StringTemplateLoader;

public class Notification {

	private String subject;
	private String content;
	private File attachement;

	public Notification(Offer offer, String template) {
		super(offer.getCustomer());
		this.stringLoader = new StringTemplateLoader();
		this.template = template;
		this.attachement = null;
	}

}
