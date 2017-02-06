package dash.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.route53.AmazonRoute53;
import com.amazonaws.services.route53.AmazonRoute53Client;

@Component
public class AwsConfig {

	@Value("${aws.key.access}")
	private String awsKeyAccess;

	@Value("${aws.key.secret}")
	private String awsKeySecret;

	@Bean
	public AmazonRoute53 getAmazonRoute53() {
		AWSCredentials awsCredentials = new BasicAWSCredentials(awsKeyAccess, awsKeySecret);
		return new AmazonRoute53Client(awsCredentials);
	}
}
