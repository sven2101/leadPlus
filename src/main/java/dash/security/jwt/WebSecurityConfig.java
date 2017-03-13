package dash.security.jwt;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import dash.licensemanangement.domain.LicenseEnum;
import dash.sourcemanagement.business.SourceService;

/**
 * WebSecurityConfig
 * 
 * @author vladimir.stankovic
 *
 *         Aug 3, 2016
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	public static final String JWT_TOKEN_HEADER_PARAM = "X-Authorization";
	public static final String FORM_BASED_LOGIN_ENTRY_POINT = "/api/rest/auth/login";
	public static final String TOKEN_BASED_AUTH_ENTRY_POINT = "/api/rest/**";
	public static final String TOKEN_REFRESH_ENTRY_POINT = "/api/rest/auth/token";
	public static final String PUBLIC_API = "/api/rest/public/**";
	public static final String DUMMY_PATH = "/dummy/**";

	@Autowired
	private RestAuthenticationEntryPoint authenticationEntryPoint;
	@Autowired
	private AuthenticationSuccessHandler successHandler;
	@Autowired
	private AuthenticationFailureHandler failureHandler;
	@Autowired
	private AjaxAuthenticationProvider ajaxAuthenticationProvider;
	@Autowired
	private JwtAuthenticationProvider jwtAuthenticationProvider;
	// @Autowired
	// private TenantAuthenticationProvider tenantAuthenticationProvider;

	@Autowired
	private TokenExtractor tokenExtractor;

	@Autowired
	private JwtSettings jwtSettings;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private SourceService sourceService;

	protected AjaxLoginProcessingFilter buildAjaxLoginProcessingFilter() throws Exception {
		AjaxLoginProcessingFilter filter = new AjaxLoginProcessingFilter(FORM_BASED_LOGIN_ENTRY_POINT, successHandler,
				failureHandler, objectMapper);
		filter.setAuthenticationManager(this.authenticationManager);
		return filter;
	}

	protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() throws Exception {
		List<String> pathsToSkip = Arrays.asList(TOKEN_REFRESH_ENTRY_POINT, FORM_BASED_LOGIN_ENTRY_POINT);
		SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, TOKEN_BASED_AUTH_ENTRY_POINT);
		JwtTokenAuthenticationProcessingFilter filter = new JwtTokenAuthenticationProcessingFilter(failureHandler,
				tokenExtractor, matcher);
		filter.setAuthenticationManager(this.authenticationManager);
		return filter;
	}

	protected ApiProcessingFilter buildApiProcessingFilter() throws Exception {
		List<String> pathsToSkip = Arrays.asList(DUMMY_PATH);
		SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, PUBLIC_API);
		ApiProcessingFilter filter = new ApiProcessingFilter(failureHandler, tokenExtractor, matcher, jwtSettings,
				sourceService);
		filter.setAuthenticationManager(this.authenticationManager);
		return filter;
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(ajaxAuthenticationProvider);
		auth.authenticationProvider(jwtAuthenticationProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable() // We don't need CSRF for JWT based authentication
				.exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint)

				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

				.and().authorizeRequests()
				.antMatchers(LicenseEnum.FREE.getAllowedRoutes()
						.toArray(new String[LicenseEnum.FREE.getAllowedRoutes().size()]))
				.permitAll() // Login
								// end-point
				.antMatchers(FORM_BASED_LOGIN_ENTRY_POINT).permitAll().antMatchers(TOKEN_REFRESH_ENTRY_POINT)
				.permitAll() // Token
				// refresh
				// end-point
				.and().authorizeRequests().antMatchers(PUBLIC_API)
				.hasAnyAuthority("ROLE_SUPERADMIN,ROLE_ADMIN,ROLE_USER,ROLE_API")
				.antMatchers(TOKEN_BASED_AUTH_ENTRY_POINT).hasAnyAuthority("ROLE_SUPERADMIN,ROLE_ADMIN,ROLE_USER")
				.anyRequest().authenticated().and()
				.addFilterBefore(buildAjaxLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterAfter(buildApiProcessingFilter(), JwtTokenAuthenticationProcessingFilter.class)
				.addFilterAfter(new TenantFallbackProcessingFilter(), JwtTokenAuthenticationProcessingFilter.class);

	}

}
