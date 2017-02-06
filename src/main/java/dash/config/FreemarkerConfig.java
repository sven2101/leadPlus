package dash.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

@Component
public class FreemarkerConfig {

	@Bean
	public Configuration cfg() {
		return new Configuration(freemarker.template.Configuration.VERSION_2_3_25);
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
}
