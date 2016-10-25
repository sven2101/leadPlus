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

import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.aws.context.config.annotation.EnableContextRegion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.route53.AmazonRoute53;
import com.amazonaws.services.route53.AmazonRoute53Client;

import dash.licensemanangement.domain.LicenseEnum;
import dash.security.AngularCsrfHeaderFilter;
import dash.security.LicenseFilter;
import dash.security.TenantAuthenticationFilter;
import dash.security.TenantAuthenticationProvider;
import dash.security.listener.RESTAuthenticationEntryPoint;
import dash.usermanagement.registration.domain.Validation;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaRepositories(basePackages = { "dash" }, entityManagerFactoryRef = "entityManagerFactory", transactionManagerRef = "entityTransactionManager")
@EnableContextRegion(region = "eu-central-1")
public class Application {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(Application.class, args);
	}

	@Configuration
	@EnableSwagger2
	public static class SwaggerConfig {
		@Bean
		public Docket api() {
			return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.basePackage("dash.publicapi")).paths(PathSelectors.any())
					.build().apiInfo(apiInfo());
		}
	}

	private static ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Lead+").description("Lead+ - Lead Management Tool").license("").licenseUrl("").version("2.0").build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AmazonRoute53 getAmazonRoute53() {
		AWSCredentials awsCredentials = new BasicAWSCredentials("***REMOVED***", "***REMOVED***");
		return new AmazonRoute53Client(awsCredentials);
	}

	@Bean
	public Validation validation() {
		return new Validation();
	}

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	public static class SecurityConfig extends WebSecurityConfigurerAdapter {

		@Autowired
		private UserDetailsService userDetailsService;

		@Autowired
		private TenantAuthenticationProvider tenantAuthenticationProvider;

		@Autowired
		private RESTAuthenticationEntryPoint authenticationEntryPoint;

		@Autowired
		private PasswordEncoder passwordEncoder;

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http.httpBasic().and().authorizeRequests()
					.antMatchers(LicenseEnum.FREE.getAllowedRoutes().toArray(new String[LicenseEnum.FREE.getAllowedRoutes().size()])).permitAll()
					.antMatchers("/api/rest/public/**").hasAnyAuthority("SUPERADMIN,ADMIN,USER,API").antMatchers("/**").hasAnyAuthority("SUPERADMIN,ADMIN,USER")
					.anyRequest().authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
					.addFilterBefore(new TenantAuthenticationFilter(this.tenantAuthenticationProvider), BasicAuthenticationFilter.class)
					.addFilterAfter(new LicenseFilter(), TenantAuthenticationFilter.class).authorizeRequests().anyRequest().authenticated().and()
					.addFilterAfter(new AngularCsrfHeaderFilter(), CsrfFilter.class).csrf().csrfTokenRepository(csrfTokenRepository()).and().csrf().disable()
					.logout().logoutUrl("/logout").logoutSuccessUrl("/").and().headers().frameOptions().sameOrigin().httpStrictTransportSecurity().disable();

			http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
		}

		private CsrfTokenRepository csrfTokenRepository() {
			HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
			repository.setHeaderName("X-XSRF-TOKEN");
			return repository;
		}

		@Autowired
		public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			auth.authenticationProvider(tenantAuthenticationProvider);
			auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
		}
	}
}