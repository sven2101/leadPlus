/*******************************************************************************
Copyright (c) 2016 Eviarc GmbH.
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

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.TimeZone;
import java.util.zip.ZipException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.aws.context.config.annotation.EnableContextRegion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import dash.multitenancy.configuration.TenantContext;
import dash.usermanagement.registration.domain.Validation;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories(basePackages = {
		"dash" }, entityManagerFactoryRef = "entityManagerFactory", transactionManagerRef = "entityTransactionManager")
@EnableContextRegion(region = "eu-central-1")
public class Application {

	public static void main(String[] args) throws ZipException, URISyntaxException, IOException {

		TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(Application.class, args);
		SchemaMigration.migrate();

	}

	@Configuration
	@EnableSwagger2
	public static class SwaggerConfig {
		@Bean
		public Docket api() {
			return new Docket(DocumentationType.SWAGGER_2).select()
					.apis(RequestHandlerSelectors.basePackage("dash.publicapi")).paths(PathSelectors.any()).build()
					.apiInfo(apiInfo());
		}
	}

	private static ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Lead+").description("Lead+ - Lead Management Tool").license("")
				.licenseUrl("").version("2.0").build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public Validation validation() {
		return new Validation();

	}

}