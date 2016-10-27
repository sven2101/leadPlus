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
package dash.tenantmanagement.business;

public class TenantContext {

	private static final ThreadLocal<String> tenantThreadLocal = new ThreadLocal<>();
	public static final String DEFAULT_TENANT = "demo";

	public static String getTenant() {
		String tenant = tenantThreadLocal.get();
		return tenant != null ? tenant : DEFAULT_TENANT;
	}

	public static void setTenant(String tenantCode) {
		tenantThreadLocal.set(tenantCode);
	}
}
