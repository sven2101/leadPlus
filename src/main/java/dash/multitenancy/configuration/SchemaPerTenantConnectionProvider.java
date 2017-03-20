package dash.multitenancy.configuration;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.hibernate.HibernateException;
import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SchemaPerTenantConnectionProvider implements MultiTenantConnectionProvider {

	private static final long serialVersionUID = -8870167700664522677L;
	@Autowired
	private DataSource dataSource;

	@Override
	public Connection getAnyConnection() throws SQLException {
		return this.dataSource.getConnection();
	}

	@Override
	public void releaseAnyConnection(Connection connection) throws SQLException {
		connection.close();
	}

	@Override
	public Connection getConnection(String tenantIdentifier) throws SQLException {
		final Connection connection = this.getAnyConnection();
		try {
			connection.createStatement().execute("SET search_path to " + tenantIdentifier);
		} catch (SQLException e) {
			throw new HibernateException(
					"Could not alter JDBC connection to specified schema [" + tenantIdentifier + "]", e);
		}
		return connection;
	}

	@Override
	public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
		try {
			connection.createStatement().execute("SET search_path to public");
		} catch (SQLException e) {
			throw new HibernateException(
					"Could not alter JDBC connection to specified schema [" + tenantIdentifier + "]", e);
		}

		connection.close();
	}

	@Override
	public boolean supportsAggressiveRelease() {
		return true;
	}

	@Override
	public boolean isUnwrappableAs(Class unwrapType) {
		return false;
	}

	@Override
	public <T> T unwrap(Class<T> unwrapType) {
		return null;
	}
}