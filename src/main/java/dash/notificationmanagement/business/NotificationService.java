
package dash.notificationmanagement.business;

import java.util.List;

import javax.mail.Session;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationContext;
import dash.notificationmanagement.domain.NotificationType;
import dash.processmanagement.business.ProcessService;
import dash.processmanagement.domain.Process;
import dash.smtpmanagement.business.ISmtpService;
import dash.smtpmanagement.business.SmtpUtil;
import dash.smtpmanagement.domain.Smtp;
import dash.smtpmanagement.domain.SmtpEncryptionType;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;

@Service
public class NotificationService implements INotificationService {

	private static final Logger logger = Logger.getLogger(NotificationService.class);

	private final NotificationRepository notificationRepository;
	private final IFileUploadService fileUploadService;
	private final ISmtpService smtpService;
	private final ProcessService processService;
	private final UserService userService;

	@Autowired
	public NotificationService(ISmtpService smtpService, ProcessService processService, UserService userService,
			NotificationRepository notificationRepository, IFileUploadService fileUploadService) {
		this.smtpService = smtpService;
		this.processService = processService;
		this.userService = userService;
		this.notificationRepository = notificationRepository;
		this.fileUploadService = fileUploadService;
	}

	@Override
	public List<Notification> getNotificationsBySenderId(final Long userId) {
		return this.notificationRepository.findTop5BySenderIdAndProcessStatusNotOrderByTimestampDesc(userId,
				Status.CLOSED);
	}

	@Override
	public Notification sendNotification(final Long processId, final Long userId,
			final NotificationContext notificationContext)
			throws NotFoundException, SaveFailedException, EmailSendFailedException {

		Notification notification = notificationContext.getNotification();
		Process process = processService.getById(processId);
		User user = userService.getById(userId);
		notification.setSender(user);
		Notification sendNotification = notification;
		try {
			Smtp smtp = smtpService.findByUserId(userId);
			if (smtp == null) {
				throw new InvalidSmtpServerException("Smtp server is null");
			}

			sendNotification = sendNotificationBySmtp(smtp, notification, notificationContext.getSmtpKey());

		} catch (Exception e) {
			sendNotification.setNotificationType(NotificationType.ERROR);
			throw new EmailSendFailedException("Failed to send");

		} finally {
			sendNotification.setProcess(process);
			sendNotification = save(sendNotification);

		}
		return sendNotification;
	}

	@Override
	public Notification sendNotificationBySmtp(final Smtp smtp, final Notification notification, final String smtpKey)
			throws Exception {

		// SMTP-Access
		String username = smtp.getUsername();
		String emailFrom = smtp.getEmail();
		String senderName = smtp.getSender();
		SmtpEncryptionType smtpEncryptionType = smtp.getEncryption();
		String password;

		// SMTP-Server
		String host = smtp.getHost();
		int port = smtp.getPort();

		// SMTP-Session
		Session session;

		this.setReferenceForAlreadyUploadFiles(notification);

		password = SmtpUtil.decryptPasswordForSmtp(smtp);
		session = SmtpUtil.createSessionWithAuthentication(host, port, smtpEncryptionType, username, password);

		if (smtpEncryptionType == SmtpEncryptionType.PLAIN)
			NotificationUtil.plainTransport(session, notification, emailFrom, senderName, host, port, username,
					password);
		else if (smtpEncryptionType == SmtpEncryptionType.TLS || smtpEncryptionType == SmtpEncryptionType.SSL
				|| smtpEncryptionType == SmtpEncryptionType.STARTTLS)
			NotificationUtil.secureTransport(session, notification, emailFrom, senderName, host, port, username,
					password);

		return notification;
	}

	private void setReferenceForAlreadyUploadFiles(Notification notification) throws NotFoundException {
		try {
			if (notification != null && notification.getAttachments() != null) {
				for (Attachment attachment : notification.getAttachments()) {
					if (attachment != null && attachment.getFileUpload() != null
							&& attachment.getFileUpload().getId() != null) {

						attachment.setFileUpload(fileUploadService.getById(attachment.getFileUpload().getId()));
					}
				}
			}
		} catch (NotFoundException e) {
			logger.error("Couldn't find referenced Attachment.", e);
			throw new NotFoundException("Couldn't find referenced Attachment.");
		}
	}

	public Notification save(Notification notification) {
		notification.getAttachments().forEach(atachment -> atachment.setNotification(notification));
		return notificationRepository.save(notification);
	}

}
