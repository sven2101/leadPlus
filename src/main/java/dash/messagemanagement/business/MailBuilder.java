package dash.messagemanagement.business;

import java.util.Set;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import dash.notificationmanagement.domain.Attachment;

public class MailBuilder {

	private MailBuilder() {
	}

	public static Multipart build(String messageText, String messageHtml, Set<Attachment> messageHtmlInline,
			Set<Attachment> attachments) throws MessagingException {
		final Multipart mpMixed = new MimeMultipart("mixed");
		final Multipart mpMixedAlternative = newChild(mpMixed, "alternative");

		addTextVersion(mpMixedAlternative, messageText);
		addHtmlVersion(mpMixedAlternative, messageHtml, messageHtmlInline);
		addAttachments(mpMixed, attachments);

		return mpMixed;
	}

	private static Multipart newChild(Multipart parent, String alternative) throws MessagingException {
		MimeMultipart child = new MimeMultipart(alternative);
		final MimeBodyPart mbp = new MimeBodyPart();
		parent.addBodyPart(mbp);
		mbp.setContent(child);
		return child;
	}

	private static void addTextVersion(Multipart mpRelatedAlternative, String messageText) throws MessagingException {
		final MimeBodyPart textPart = new MimeBodyPart();
		textPart.setText(messageText, "utf-8");
		textPart.setContent(messageText, "text/plain; charset=utf-8");
		mpRelatedAlternative.addBodyPart(textPart);
	}

	private static void addHtmlVersion(Multipart parent, String messageHtml, Set<Attachment> embeded)
			throws MessagingException {
		// HTML version
		final Multipart mpRelated = newChild(parent, "related");

		// Html
		final MimeBodyPart htmlPart = new MimeBodyPart();

		htmlPart.setContent(messageHtml, "text/html; charset=utf-8");
		mpRelated.addBodyPart(htmlPart);

		// Inline images
		addImagesInline(mpRelated, embeded);
	}

	private static void addImagesInline(Multipart parent, Set<Attachment> embeded) throws MessagingException {
		if (embeded != null) {
			for (Attachment attachment : embeded) {
				final MimeBodyPart htmlPartImg = new MimeBodyPart();
				ByteArrayDataSource htmlPartImgDs = new ByteArrayDataSource(attachment.getFileUpload().getContent(),
						attachment.getFileUpload().getMimeType());
				htmlPartImg.setDataHandler(new DataHandler(htmlPartImgDs));
				htmlPartImg.setHeader("Content-ID", "<" + attachment.getFileUpload().getFilename() + ">");
				htmlPartImg.setDisposition(BodyPart.INLINE);
				parent.addBodyPart(htmlPartImg);
			}
		}
	}

	private static void addAttachments(Multipart parent, Set<Attachment> attachments) throws MessagingException {
		if (attachments != null) {
			for (Attachment attachment : attachments) {
				final MimeBodyPart mbpAttachment = new MimeBodyPart();
				ByteArrayDataSource htmlPartImgDs = new ByteArrayDataSource(attachment.getFileUpload().getContent(),
						attachment.getFileUpload().getMimeType());
				mbpAttachment.setDataHandler(new DataHandler(htmlPartImgDs));
				mbpAttachment.setDisposition(BodyPart.ATTACHMENT);
				mbpAttachment.setFileName(attachment.getFileUpload().getFilename());
				parent.addBodyPart(mbpAttachment);
			}
		}
	}
}