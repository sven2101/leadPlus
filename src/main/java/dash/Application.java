package dash;


import dash.security.CsrfHeaderFilter;
import dash.usermanagement.Role;
import dash.usermanagement.User;
import dash.usermanagement.UserRepository;
import dash.usermanagement.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


import com.google.common.base.Predicate;

import javax.annotation.PostConstruct;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.KeyPair;

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
                .description("Applica is meant to manage your appliaction")
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

    @PostConstruct
    public void createAdminIfNotExists() throws Exception {
        if (userRepository.findByUsername("admin") == null){

            User user = new User();

            user.setUsername("admin".toLowerCase());
            user.setPassword( passwordEncoder().encode("admin"));
            user.setEmail("andreas.foitzik@live.com");
            user.setRole(Role.ADMIN);

            userRepository.save(user);
        }
    }

    @EnableWebSecurity
    @Configuration
    public static class SecurityConfig extends WebSecurityConfigurerAdapter {

        @Autowired
        private UserDetailsService userDetailsService;

        @Autowired
        public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsService);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/**",
                        "/application/api/rest/applications**",
                        "/application/api/rest/containers**",
                        "/application/api/rest/inquirers**",
                        "/application/api/rest/vendors**").permitAll()
                .and()
                .csrf().disable();
        }
    }

}