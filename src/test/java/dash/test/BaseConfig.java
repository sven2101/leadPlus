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
package dash.test;

import org.apache.commons.codec.binary.Base64;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

public class BaseConfig {

	protected final static String BASE_URI = "http://localhost:8080";
	protected final static String USERNAME = "test";
	protected final static String PASSWORD = "test";

	protected RestTemplate restTemplate = new TestRestTemplate();
	protected HttpHeaders headers = new HttpHeaders();

	protected String plainCreds = USERNAME + ":" + PASSWORD;
	protected byte[] plainCredsBytes = plainCreds.getBytes();
	protected byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
	protected String base64Creds = new String(base64CredsBytes);

}
