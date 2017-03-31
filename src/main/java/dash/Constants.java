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
package dash;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public final class Constants {

	/*
	 * Exceptions
	 */
	public static final String NOT_FOUND = "Not found. ";
	public static final String PROCESS_NOT_FOUND = "Process not found. ";
	public static final String PRODUCT_NOT_FOUND = "Product not found. ";
	public static final String COMMENT_NOT_FOUND = "Comment not found. ";
	public static final String USER_NOT_FOUND = "User not found. ";
	public static final String SMTP_NOT_FOUND = "Smtp not found";
	public static final String STATISTIC_NOT_FOUND = "Statistic not found. ";
	public static final String EMAIL_NOT_FOUND = "Email not found. ";
	public static final String DONT_MATCH = "Password does not match. ";
	public static final String VENDOR_NOT_FOUND = "Vendor not found. ";
	public static final String SALE_NOT_FOUND = "Sale not found. ";
	public static final String OFFER_NOT_FOUND = "Offer not found. ";
	public static final String LEAD_NOT_FOUND = "Lead not found. ";
	public static final String INVALID_LEAD = "Invalid Lead. ";
	public static final String INVALID_CUSTOMER_EMAIL = "Invalid customer email. ";
	public static final String INVALID_ORDERPOSITIONS = "Invalid OrderPositions. ";
	public static final String INQUIRER_NOT_FOUND = "Inquirer not found. ";
	public static final String CUSTOMER_NOT_FOUND = "Customer not found. ";
	public static final String PROSPECT_NOT_FOUND = "Prospect not found. ";
	public static final String FILE_NOT_FOUND = "File not found. ";
	public static final String ATTACHMENT_NOT_FOUND = "Attachment not found. ";
	public static final String TEMPLATE_NOT_FOUND = "Template not found. ";
	public static final String TENANT_NOT_FOUND = "Tenant not found. ";
	public static final String RESET_ID_NOT_FOUND = "Password Reset ID not found";

	public static final String USER_NOT_ACTIVATED = "User not activated. ";
	public static final String USER_EXISTS = "Username already exists. ";
	public static final String EMAIL_EXISTS = "Email already exists. ";

	public static final String SAVE_FAILED_EXCEPTION = "Save failed Exception. ";
	public static final String UPDATE_FAILED_EXCEPTION = "Update failed Exception. ";
	public static final String DELETE_FAILED_EXCEPTION = "Delete failed Exception. ";
	public static final String REGISTER_FAILED_EXCEPTION = "Register failed Exception. ";

	public static final String BECAUSE_OF_OBJECT_IS_NULL = " BECAUSE OF OBJECT IS NULL ";
	public static final String BECAUSE_OF_ILLEGAL_ID = " BECAUSE OF ILLEGAL ID ";
	public static final String BECAUSE_OF_USER_NOT_FOUND = " BECAUSE OF USER NOT FOUND ";

	public static final String PUBLIC_API_NEW_LEAD = "Created new LEAD via Public API. ";

	public static final String CURRENT_TENANT_IDENTIFIER = "CURRENT_TENANT_IDENTIFIER";
	public static final String UNKNOWN_TENANT = "unknown";

	// DEBUGGING - NOTIFICATIONS
	public static final String CREATING_SUBDOMAIN = "CREATING SUBDOMAIN ON AWS R53 FOR ";
	public static final String TENANT_ALREADY_EXISTS = "TENANT KEY already exists ";

	/*
	 * Variables
	 */
	public static final String SMTP_KEY = "smtpKey";
	public static final String NOTIFICATION = "notification";
	public static final String SMTP = "smtp";
	public static final String UTF_8 = "UTF-8";
	public static String MAIL_DEBUG_VALUE = "false";

	/*
	 * SMTP
	 */
	public static final String MAIL_TRANSPORT_PROTOCOL = "mail.transport.protocol";
	public static final String MAIL_DEBUG = "mail.debug";

	// The SMTP server to connect to.
	public static final String MAIL_SMTP_HOST = "mail.smtp.host";
	public static final String MAIL_SMTP_AUTH = "mail.smtp.auth";
	public static final String MAIL_SMTP_PORT = "mail.smtp.port";
	// Socket connection timeout value in milliseconds. This timeout is
	// implemented by java.net.Socket. Default is infinite timeout.
	public static final String MAIL_SMTP_CONNECTION_TIMEOUT = "mail.smtp.connectiontimeout";
	// Socket read timeout value in milliseconds. This timeout is implemented by
	// java.net.Socket. Default is infinite timeout.
	public static final String MAIL_SMTP_TIMEOUT = "mail.smtp.timeout";
	public static final String MAIL_SMTP_WRITETIMEOUT = "mail.smtp.writetimeout";
	public static final String MAIL_SMTP_SEND_PARTIAL = "mail.smtp.sendpartial";
	public static final String MAIL_SMTP_STARTTLS_ENABLE = "mail.smtp.starttls.enable";
	public static final String MAIL_SMTP_QUITWAIT = "mail.smtp.quitwait";
	public static final String MAIL_SMTP_DSN_NOTIFY = "mail.smtp.dsn.notify";
	public static final String MAIL_SMTP_REPORTSUCCESS = "mail.smtp.reportsuccess";

	public static final String MAIL_SMTP_SSL_ENABLE = "mail.smtps.ssl.enable";
	public static final String MAIL_SMTP_SSL_QUITWAIT = "mail.smtps.host";
	public static final String MAIL_SMTP_SSL_SOCKET_FACTORY_PORT = "mail.smtps.socketFactory.port";
	public static final String MAIL_SMTP_SSL_SOCKET_FACTORY_CLASS = "mail.smtps.socketFactory.class";
	public static final String MAIL_SMTP_SSL_PORT = "mail.smtps.port";
	public static final String MAIL_SMTP_SSL_AUTH = "mail.smtps.auth";
	public static final String MAIL_SMTP_SSL_HOST = "mail.smtps.port";
	public static final String MAIL_SMTP_SSL_CONNECTION_TIMEOUT = "mail.smtps.connectiontimeout";
	public static final String MAIL_SMTP_SSL_TIMEOUT = "mail.smtps.timeout";
	public static final String MAIL_SMTP_SSL_SEND_PARTIAL = "mail.smtps.sendpartial";
	public static final String MAIL_SMTP_SSL_WRITETIMEOUT = "mail.smtps.writetimeout";
	public static final String MAIL_SMTP_SSL_DSN_NOTIFY = "mail.smtp.dsn.notify";
	public static final String MAIL_SMTP_SSL_TRUST = "mail.smtps.ssl.trust";
	public static final String MAIL_SMTP_SSL_REPORTSUCCESS = "mail.smtps.reportsuccess";

	public static final String TRUE = "true";
	public static final String FALSE = "false";

	@Value("${mail.debug}")
	public void setMailDebug(String debug) {
		if (debug.equals("true") || debug.equals("false"))
			MAIL_DEBUG_VALUE = debug;
	}

}
