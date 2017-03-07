package dash.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.route53.AmazonRoute53;
import com.amazonaws.services.route53.AmazonRoute53Client;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;

@Component
public class AwsConfig {

	@Value("${aws.key.access}")
	private String awsKeyAccess;

	@Value("${aws.key.secret}")
	private String awsKeySecret;

	@Value("${aws.ses.key.access.leadplus.io}")
	private String awsSeSKeyAccess;

	@Value("${aws.ses.key.secret.leadplus.io}")
	private String awsSeSKeySecret;

	@Bean
	public AmazonRoute53 getAmazonRoute53() {
		return new AmazonRoute53Client(new BasicAWSCredentials(awsKeyAccess, awsKeySecret));
	}

	@Bean
	public AmazonSimpleEmailServiceClient getAmazonSimpleEmailServiceClient() {
		AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient = new AmazonSimpleEmailServiceClient(
				new BasicAWSCredentials(awsSeSKeyAccess, awsSeSKeySecret));
		amazonSimpleEmailServiceClient.setRegion(Region.getRegion(Regions.EU_WEST_1));
		return amazonSimpleEmailServiceClient;
	}
}
