package dash;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SchemaMigration {

	private static final Logger logger = Logger.getLogger(SchemaMigration.class);

	private static String datasourceUrl;

	@Value("${spring.datasource.url}")
	public void setDatasourceUrl(String url) {
		datasourceUrl = url;
	}

	private static String datasourceUsername;

	@Value("${spring.datasource.username}")
	public void setDatasourceUsername(String username) {
		datasourceUsername = username;
	}

	private static String datasourcePassword;

	@Value("${spring.datasource.password}")
	public void setDatasourcePassword(String password) {
		datasourcePassword = password;
	}

	private static String databaseDriverClassName;

	@Value("${spring.database.driverClassName}")
	public void setDatabaseDriverClassName(String driverClassName) {
		databaseDriverClassName = driverClassName;
	}

	public static void migrate() {
		List<String> schemas = null;
		List<String> tenants = null;

		try {
			schemas = getDatabaseSchemas();
			tenants = getTenants();

			Flyway flyway = new Flyway();
			flyway.setDataSource(datasourceUrl, datasourceUsername, datasourcePassword, "");

			for (String schema : schemas) {
				if (tenants.contains(schema)) {
					flyway.setSchemas(schema);
					flyway.migrate();
				}
			}

		} catch (Exception ex) {
			logger.error(SchemaMigration.class.getSimpleName(), ex);
		}
		logger.debug("Migrated all Schemas.");
	}

	public static List<String> getDatabaseSchemas() throws Exception {
		List<String> databaseSchemas = new ArrayList<>();

		Connection conn = getPostgreSqlConnection();

		DatabaseMetaData meta = conn.getMetaData();
		ResultSet schemas = meta.getSchemas();

		while (schemas.next()) {
			databaseSchemas.add(schemas.getString(1));
		}

		conn.close();
		return databaseSchemas;
	}

	public static List<String> getTenants() throws Exception {
		List<String> tenants = new ArrayList<>();

		Connection conn = getPostgreSqlConnection();

		Statement stmt = null;
		String query = "SELECT tenantkey FROM public.tenant";
		stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while (rs.next()) {
			tenants.add(rs.getString("tenantkey"));
		}
		stmt.close();
		conn.close();
		return tenants;
	}

	public static Connection getPostgreSqlConnection() throws Exception {
		Class.forName(databaseDriverClassName);
		Connection conn = DriverManager.getConnection(datasourceUrl, datasourceUsername, datasourcePassword);
		return conn;
	}
}
