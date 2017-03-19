package dash.usermanagement.password.forgot.business;

import static dash.Constants.TENANT_NOT_FOUND;
import static dash.Constants.USER_NOT_FOUND;

import java.util.Calendar;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.messagemanagement.business.MessageService;
import dash.messagemanagement.domain.EmailMessage;
import dash.notificationmanagement.business.AWSEmailService;
import dash.smtpmanagement.business.SmtpService;
import dash.smtpmanagement.domain.Smtp;
import dash.tenantmanagement.business.TenantContext;
import dash.tenantmanagement.business.TenantService;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import dash.usermanagement.settings.language.Language;
import freemarker.template.TemplateException;
import javassist.NotFoundException;

@Service
public class PasswordForgotService {

	private PasswordForgotRepository passwordForgotRepository;
	private UserService userService;
	private MessageService messageService;
	private TenantService tenantService;
	private AWSEmailService awsEmailService;
	private SmtpService smtpService;

	@Autowired
	public PasswordForgotService(PasswordForgotRepository passwordForgotRepository, UserService userService,
			MessageService messageService, TenantService tenantService, AWSEmailService awsEmailService,
			SmtpService smtpService) {
		this.passwordForgotRepository = passwordForgotRepository;
		this.userService = userService;
		this.messageService = messageService;
		this.tenantService = tenantService;
		this.awsEmailService = awsEmailService;
		this.smtpService = smtpService;
	}

	public PasswordForgot save(String email) throws NotFoundException, TemplateException, MessagingException {
		PasswordForgot passwordForgot = new PasswordForgot();
		final Tenant tenant;
		final User user;
		final Smtp smtp;
		final EmailMessage abstractMessage;
		final String emailFrom = "support@leadplus.io";
		String template = "forgot_password_en.ftl";

		String randomID;
		boolean isUUIDinUse = false;
		do {
			randomID = String.valueOf(UUID.randomUUID().toString());
			if (this.passwordForgotRepository.findByRandomKey(randomID) != null)
				isUUIDinUse = true;
		} while (isUUIDinUse);

		passwordForgot.setRandomKey(randomID);
		passwordForgot.setTimestamp(Calendar.getInstance());

		user = this.userService.getUserByEmail(email);
		if (user == null)
			throw new UsernameNotFoundException(USER_NOT_FOUND);

		passwordForgot.setEmail(email);

		smtp = this.smtpService.findByUserUsername(email);
		if (smtp == null)
			passwordForgot.setResetSmtp(false);
		else
			passwordForgot.setResetSmtp(true);

		tenant = tenantService.getTenantByName(TenantContext.getTenant());
		if (tenant == null)
			throw new NotFoundException(TENANT_NOT_FOUND);

		if (user.getLanguage() == Language.DE)
			template = "forgot_password_de.ftl";

		abstractMessage = (EmailMessage) this.messageService.getForgotPasswordMessage(template, tenant, user,
				passwordForgot);

		this.awsEmailService.send(emailFrom, abstractMessage.getRecipients(), abstractMessage.getSubject(),
				abstractMessage.getContent());

		return this.passwordForgotRepository.save(passwordForgot);
	}

	public PasswordForgot getByRandomKey(String randomKey) {
		final PasswordForgot passwordForgot = this.passwordForgotRepository.findByRandomKey(randomKey);
		if (passwordForgot != null) {
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DAY_OF_YEAR, -2);
			if (calendar.before(passwordForgot.getTimestamp()))
				return passwordForgot;
			else
				return null;
		} else
			return null;
	}

	public void delete(PasswordForgot passwordForgot) {
		this.passwordForgotRepository.delete(passwordForgot);
	}
}
