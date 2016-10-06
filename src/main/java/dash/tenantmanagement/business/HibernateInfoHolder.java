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

import org.hibernate.boot.Metadata;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.service.spi.SessionFactoryServiceRegistry;

public class HibernateInfoHolder {

	private static Metadata metadata;

	private static SessionFactoryImplementor sessionFactory;

	private static SessionFactoryServiceRegistry serviceRegistry;

	public static Metadata getMetadata() {
		return metadata;
	}

	public static void setMetadata(Metadata metadata) {
		HibernateInfoHolder.metadata = metadata;
	}

	public static SessionFactoryImplementor getSessionFactory() {
		return sessionFactory;
	}

	public static void setSessionFactory(SessionFactoryImplementor sessionFactory) {
		HibernateInfoHolder.sessionFactory = sessionFactory;
	}

	public static SessionFactoryServiceRegistry getServiceRegistry() {
		return serviceRegistry;
	}

	public static void setServiceRegistry(SessionFactoryServiceRegistry serviceRegistry) {
		HibernateInfoHolder.serviceRegistry = serviceRegistry;
	}
}
