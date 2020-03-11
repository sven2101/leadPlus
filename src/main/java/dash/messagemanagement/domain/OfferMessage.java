package dash.messagemanagement.domain;

import java.util.Set;

import dash.notificationmanagement.domain.Attachment;
import dash.notificationmanagement.domain.NotificationType;

public class OfferMessage extends AbstractMessage {

	/**
	 * @param recipient
	 *            - guy who receives this Message
	 * @param subject
	 *            - subject of this specific Message
	 * @param content
	 *            - content of this specific Message
	 * @param attachment
	 *            - attachment of this specific Message
	 */
	public OfferMessage(String recipient, String subject, String content, Set<Attachment> attachments,
			NotificationType notificationType) {
		super(recipient, subject, content, attachments, notificationType);
	}
}