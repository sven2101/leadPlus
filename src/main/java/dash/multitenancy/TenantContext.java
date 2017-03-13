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
package dash.multitenancy;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

public class TenantContext {

	public static final String NO_TENANT = "NO_TENANT";
	public static final String TENANT_NOT_FOUND = "TENANT_NOT_FOUND";
	public static final String PUBLIC_TENANT = "public";
	public static final String TENANT_KEY = "tenant";

	public static String getTenant() {
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		if (requestAttributes != null) {
			String tenantId = (String) requestAttributes.getAttribute(TENANT_KEY, RequestAttributes.SCOPE_REQUEST);
			if (tenantId != null) {
				return tenantId;
			}
		}
		return PUBLIC_TENANT;
	}

	public static void setTenant(String tenantCode) {

		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

		if (requestAttributes != null) {
			requestAttributes.setAttribute(TENANT_KEY, tenantCode, RequestAttributes.SCOPE_REQUEST);

			RequestContextHolder.setRequestAttributes(requestAttributes);
		} else {
			RequestContextHolder.resetRequestAttributes();
			requestAttributes = RequestContextHolder.getRequestAttributes();
			requestAttributes.setAttribute(TENANT_KEY, tenantCode, RequestAttributes.SCOPE_REQUEST);

			RequestContextHolder.setRequestAttributes(requestAttributes);
		}
		String x = getTenant();

	}
}
