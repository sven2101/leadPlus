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

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.service.spi.ServiceRegistryImplementor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.tenantmanagement.domain.Tenant;

@Service
public class TenantService implements ITenantService {

	@Autowired
	private TenantRepository tenantRepository;

	@PersistenceContext(unitName = "default")
	private EntityManager entityManager;

	@Autowired
	private DataSource dataSource;

	private ServiceRegistryImplementor serviceRegistry;

	protected SessionFactoryImplementor sessionFactory;

	@Override
	public Tenant createNewTenant(final Tenant tenant) {
		createSchema(tenant);
		return tenant;
	}

	public void createSchema(final Tenant tenant) {
		//		Flyway flyway = new Flyway();
		//		flyway.setDataSource(…);
		//		flyway.setLocations(“filesystem:/path/to/migrations”);
		//		flyway.migrate();

		Persistence.generateSchema("samplePU", null);

		if (entityManager != null) {
			// Get a local configuration to configure
			//			final Configuration tenantConfig = new Configuration();
			//
			//			// Set the properties for this configuration
			//			Properties props = new Properties();
			//			props.put(Environment.DEFAULT_SCHEMA, tenant.getTenantKey());
			//			props.put(Environment.HBM2DDL_AUTO, "create");
			//			tenantConfig.addProperties(props);
			//
			//			// Get connection
			//			Connection connection;
			//			try {
			//				connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/applica", "postgres", "***REMOVED***");
			//				connection.createStatement().execute("CREATE SCHEMA " + tenant.getTenantKey() + "");
			//
			//			} catch (SQLException e) {
			//				// TODO Auto-generated catch block
			//				e.printStackTrace();
			//			}
			//
			//			tenantRepository.save(tenant);
			//			// Create the schema
			//
			//			AbstractMultiTenantConnectionProvider multiTenantConnectionProvider = buildMultiTenantConnectionProvider();
			//
			//			Map settings = new HashMap();
			//			settings.put(Environment.MULTI_TENANT, MultiTenancyStrategy.SCHEMA);
			//			settings.put(Environment.CACHE_REGION_FACTORY, CachingRegionFactory.class.getName());
			//			settings.put(Environment.GENERATE_STATISTICS, "true");
			//
			//			serviceRegistry = (ServiceRegistryImplementor) new StandardServiceRegistryBuilder().applySettings(settings)
			//					.addService(MultiTenantConnectionProvider.class, multiTenantConnectionProvider).build();
			//
			//			MetadataSources ms = new MetadataSources(serviceRegistry);
			//			ms.addAnnotatedClass(Customer.class);
			//			ms.addAnnotatedClass(Invoice.class);
			//
			//			Metadata metadata = ms.buildMetadata();
			//			((RootClass) metadata.getEntityBinding(Customer.class.getName())).setCacheConcurrencyStrategy("read-write");

		} else {
			System.out.println("Error!!!!!!!!!!!!!!!!!!!!!");
		}
	}
}
