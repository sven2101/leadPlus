package dash.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import dash.licensemanangement.domain.LicenseEnum;
import dash.security.listener.RESTAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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
				.antMatchers(LicenseEnum.FREE.getAllowedRoutes()
						.toArray(new String[LicenseEnum.FREE.getAllowedRoutes().size()]))
				.permitAll().antMatchers("/api/rest/public/**").hasAnyAuthority("SUPERADMIN,ADMIN,USER,API")
				.antMatchers("/**").hasAnyAuthority("SUPERADMIN,ADMIN,USER").anyRequest().authenticated().and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.addFilterBefore(new TenantAuthenticationFilter(this.tenantAuthenticationProvider),
						BasicAuthenticationFilter.class)
				.addFilterAfter(new LicenseFilter(), TenantAuthenticationFilter.class).authorizeRequests().anyRequest()
				.authenticated().and().addFilterAfter(new AngularCsrfHeaderFilter(), CsrfFilter.class).csrf()
				.csrfTokenRepository(csrfTokenRepository()).and().csrf().disable().headers().frameOptions().sameOrigin()
				.httpStrictTransportSecurity().disable().and().logout()
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"));

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
