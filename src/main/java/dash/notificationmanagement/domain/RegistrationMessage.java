///*******************************************************************************
// * Copyright (c) 2016 Eviarc GmbH.
// * All rights reserved.  
// *
// * NOTICE:  All information contained herein is, and remains
// * the property of Eviarc GmbH and its suppliers, if any.  
// * The intellectual and technical concepts contained
// * herein are proprietary to Eviarc GmbH,
// * and are protected by trade secret or copyright law.
// * Dissemination of this information or reproduction of this material
// * is strictly forbidden unless prior written permission is obtained
// * from Eviarc GmbH.
// *******************************************************************************/
//
//package dash.notificationmanagement.domain;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import dash.customermanagement.domain.Customer;
//
//public class RegistrationMessage extends AbstractMessage {
//
//	private TemplateRenderer renderer;
//
//	public RegistrationMessage(Customer recipient) {
//		super(recipient);
//		this.renderer = new TemplateRenderer("offer.ftl");
//	}
//
//	@Override
//	public String getSubject() {
//		return "Angebot";
//	}
//
//	@Override
//	public String getContent() {
//		Map<String, Object> ctx = new HashMap<>(1);
//		ctx.put("user", recipient);
//		try {
//			return renderer.render(ctx);
//		} catch (Exception e) {
//			throw new RuntimeException("Problem rendering registration email content", e);
//
//		}
//	}
//}
