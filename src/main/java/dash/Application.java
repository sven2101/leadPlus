package dash;

import dash.security.AngularCsrfHeaderFilter;
import dash.security.listener.RESTAuthenticationEntryPoint;
import dash.usermanagement.Role;
import dash.usermanagement.User;
import dash.usermanagement.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import com.google.common.base.Predicate;

import javax.annotation.PostConstruct;

import static com.google.common.base.Predicates.*;
import static springfox.documentation.builders.PathSelectors.*;

/**
 * Created by Andreas on 09.10.2015.
 */

@SpringBootApplication
@EnableSwagger2
@EnableJpaRepositories
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    @ConditionalOnMissingBean
    public Docket multipartApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("cbd-api")
                .apiInfo(apiInfo())
                .select()
                //.paths(cbdPaths())
                .build();
    }

    private Predicate<String> cbdPaths() {
        return or(
                regex("/applica/api/rest/applications.*"),
                regex("/applica/api/rest/containers.*"),
                regex("/applica/api/rest/inquirers.*"),
                regex("/applica/api/rest/users.*"),
                regex("/applica/api/rest/vendors.*")
        );
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Applica")
                .description("Applica is meant to manage your leadss")
                .license("")
                .licenseUrl("")
                .version("1.0")
                .build();
    }

    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    /*
    @PostConstruct
    public void createAdminIfNotExists() throws Exception {

        User user1 = new User();

        user1.setUsername("andreas".toLowerCase());
        user1.setPassword( passwordEncoder().encode("admin"));
        user1.setEmail("andreas.foitzik@live.com");
        user1.setRole(Role.ADMIN);

        userRepository.save(user1);
        
        User user2 = new User();

        user2.setUsername("sven".toLowerCase());
        user2.setPassword( passwordEncoder().encode("admin"));
        user2.setEmail("sven-jaschkewitz@web.de");
        user2.setRole(Role.ADMIN);

        userRepository.save(user2);
    }
    */
    @EnableWebSecurity
    @Configuration
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

		http.httpBasic().and()
				.authorizeRequests()
				.antMatchers(HttpMethod.GET, "/application/**").permitAll()
				.antMatchers("application/user/**").permitAll()
				.antMatchers("application/**",
					    "/user",
					    "/application/user",
			                    "/application/api/rest/comments**",
			                    "/application/api/rest/containers**",
			                    "/application/api/rest/inquirers**",
			                    "/application/api/rest/leads**",
			                    "/application/api/rest/sales**",
			                    "/application/api/rest/vendors**",
			                    "/application/api/rest/registrations**")
				.permitAll()
				.and()
				.addFilterAfter(new AngularCsrfHeaderFilter(), CsrfFilter.class)
				.csrf()
				.csrfTokenRepository(csrfTokenRepository())
				.and()
				.csrf()
				.disable()
				.logout()
				.logoutUrl("/logout")
				.logoutSuccessUrl("/")
				.and()
				.headers()
				.frameOptions().sameOrigin()
				.httpStrictTransportSecurity().disable();
		
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