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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Calendar;
import java.util.TimeZone;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.codec.binary.Base64;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import dash.security.AngularCsrfHeaderFilter;
import dash.security.listener.RESTAuthenticationEntryPoint;
import dash.usermanagement.registration.domain.Validation;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaRepositories
@EnableContextRegion(region = "eu-central-1")
public class Application {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));

		SpringApplication.run(Application.class, args);
		Runnable runnable = new Runnable() {
			public void run() {
				try {
					if (Calendar.getInstance().get(Calendar.HOUR_OF_DAY) > 6) {
						System.out.println("Generate Statistics...");
						URL generateStatistic = new URL("http://localhost:8080/api/rest/processes/statistics/generate");
						URLConnection connection = generateStatistic.openConnection();
						String userpass = "test" + ":" + "9lVUCPPoOlXqS1qX8UxDQb9ggY3jbtbM0x2ScyEbMHw=";
						String basicAuth = "Basic " + new String(new Base64().encode(userpass.getBytes()));
						connection.setRequestProperty("Authorization", basicAuth);
						BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
						String inputLine;

						while ((inputLine = in.readLine()) != null)
							System.out.println(inputLine);
						in.close();
						System.out.println("Statistics generated...");
					}
				} catch (IOException e) {
					System.out.println("Something went wrong...");
				}
			}
		};
		ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
		service.scheduleAtFixedRate(runnable, 10, 1500, TimeUnit.SECONDS);
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

	@Bean
	public freemarker.template.Configuration cfg() {
		return new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_25);
	}

	@Bean
	public FreeMarkerConfigurer freeMarkerConfigurer(WebApplicationContext applicationContext)
			throws IOException, TemplateException {
		FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
		freemarker.template.Configuration configuration = configurer.createConfiguration();
		configuration.setTemplateExceptionHandler(TemplateExceptionHandler.HTML_DEBUG_HANDLER);
		configuration.setDefaultEncoding("UTF-8");
		configuration.setOutputEncoding("UTF-8");
		configuration.setURLEscapingCharset("UTF-8");
		configurer.setConfiguration(configuration);
		return configurer;
	}

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	public static class SecurityConfig extends WebSecurityConfigurerAdapter {

		@Autowired
		private UserDetailsService userDetailsService;

		@Autowired
		private RESTAuthenticationEntryPoint authenticationEntryPoint;

		@Autowired
		private PasswordEncoder passwordEncoder;

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http.httpBasic().and().authorizeRequests()
					.antMatchers("/", "/images/favicon**", "/assets/**", "/fonts/**", "/app/**",
							"/components/Login/view/Login.html", "/components/Signup/view/Signup.html",
							"/api/rest/registrations/**", "/swagger-ui.html", "/webjars/springfox-swagger-ui/**",
							"/configuration/ui", "/swagger-resources", "/v2/api-docs/**", "/configuration/security")
					.permitAll().antMatchers("/api/rest/public**", "/api/rest/processes/statistics/generate")
					.hasAnyAuthority("SUPERADMIN,ADMIN,USER,API").anyRequest().authenticated().antMatchers("/**")
					.hasAnyAuthority("SUPERADMIN,ADMIN,USER").anyRequest().authenticated().and()
					.addFilterAfter(new AngularCsrfHeaderFilter(), CsrfFilter.class).csrf()
					.csrfTokenRepository(csrfTokenRepository()).and().csrf().disable().headers().frameOptions()
					.sameOrigin().httpStrictTransportSecurity().disable().and().logout()
					.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/#/login");

			http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
		}

		private CsrfTokenRepository csrfTokenRepository() {
			HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
			repository.setHeaderName("X-XSRF-TOKEN");
			return repository;
		}

		@Autowired
		public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
		}
	}
}