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

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class PublicHibernateConfig {

	@Autowired
	private DataSource dataSource;

	@Bean(name = "publicSchemaEntityTransactionManager")
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager tm = new JpaTransactionManager();
		tm.setEntityManagerFactory(publicSchemaEntityManagerFactory().getObject());
		tm.setDataSource(dataSource);
		return tm;
	}

	@Bean
	public JpaVendorAdapter jpaVendorAdapter() {
		return new HibernateJpaVendorAdapter();
	}

	@Bean(name = "publicSchemaEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean publicSchemaEntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean emfBean = new LocalContainerEntityManagerFactoryBean();
		emfBean.setDataSource(dataSource);
		emfBean.setPackagesToScan("dash.tenantmanagement.domain");
		emfBean.setJpaVendorAdapter(jpaVendorAdapter());

		Map<String, Object> jpaProperties = new HashMap<>();
		jpaProperties.put(Environment.DEFAULT_SCHEMA, "public");
		jpaProperties.put(Environment.SHOW_SQL, "true");
		jpaProperties.put(Environment.HBM2DDL_AUTO, "none");
		emfBean.setJpaPropertyMap(jpaProperties);

		return emfBean;
	}

}