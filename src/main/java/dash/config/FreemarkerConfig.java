package dash.config;

import java.io.IOException;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;

@Component
public class FreemarkerConfig {

	@Autowired
	protected FreeMarkerProperties properties;

	@Bean
	@Primary
	@Qualifier(value = "freeMarkerStringTemplatesConfigurer")
	public Configuration freeMarkerStringTemplatesConfigurer(FreeMarkerConfigurationFactory factory)
			throws IOException, TemplateException {
		Properties settings = new Properties();
		settings.putAll(this.properties.getSettings());
		factory.setFreemarkerSettings(settings);
		return factory.createConfiguration();
	}
}
