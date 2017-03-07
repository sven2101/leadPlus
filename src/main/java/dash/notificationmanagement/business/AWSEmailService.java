package dash.notificationmanagement.business;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClient;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;

@Service
public class AWSEmailService {

	private static final Logger logger = Logger.getLogger(AWSEmailService.class);

	private AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient;

	@Autowired
	public AWSEmailService(AmazonSimpleEmailServiceClient amazonSimpleEmailServiceClient) {
		this.amazonSimpleEmailServiceClient = amazonSimpleEmailServiceClient;
	}

	public void sendMail(final String fromEmail, final String toEmail, final String subject, final String emailBody) {

		SendEmailRequest request = new SendEmailRequest().withSource(fromEmail);

		List<String> toAddresses = new ArrayList<>();
		toAddresses.add(toEmail);
		Destination dest = new Destination().withToAddresses(toAddresses);

		List<String> toBccAddresses = new ArrayList<>();
		toBccAddresses.add(fromEmail);
		dest.setBccAddresses(toBccAddresses);
		request.setDestination(dest);

		Content subjContent = new Content().withData(subject);
		Message msg = new Message().withSubject(subjContent);

		// Include a body in HTML formats.
		Content htmlContent = new Content().withData(emailBody);
		Body body = new Body().withHtml(htmlContent);
		msg.setBody(body);

		request.setMessage(msg);

		try {
			this.amazonSimpleEmailServiceClient.sendEmail(request);
		} catch (Exception e) {
			logger.error("Error connecting to AWS SES.", e);
		}
	}
}
