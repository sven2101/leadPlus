package dash.messagemanagement.business;

import java.util.HashMap;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import dash.notificationmanagement.domain.Attachment;

public class MailContentBuilder {

	/**
	 * Build an email message.
	 *
	 * The HTML may reference the embedded image (messageHtmlInline) using the
	 * filename. Any path portion is ignored to make my life easier e.g. If you
	 * pass in the image C:\Temp\dog.jpg you can use <img src="dog.jpg"/> or
	 * <img src="C:\Temp\dog.jpg"/> and both will work
	 *
	 * @param messageText
	 * @param messageHtml
	 * @param messageHtmlInline
	 * @param attachments
	 * @return
	 * @throws MessagingException
	 */
	public Multipart build(String messageText, String messageHtml, Set<Attachment> messageHtmlInline,
			Set<Attachment> attachments) throws MessagingException {
		final Multipart mpMixed = new MimeMultipart("mixed");
		{
			// alternative
			final Multipart mpMixedAlternative = newChild(mpMixed, "alternative");
			{
				// Note: MUST RENDER HTML LAST otherwise iPad mail client only
				// renders the last image and no email
				addTextVersion(mpMixedAlternative, messageText);
				addHtmlVersion(mpMixedAlternative, messageHtml, messageHtmlInline);
			}
			// attachments
			addAttachments(mpMixed, attachments);
		}

		// msg.setText(message, "utf-8");
		// msg.setContent(message,"text/html; charset=utf-8");
		return mpMixed;
	}

	private Multipart newChild(Multipart parent, String alternative) throws MessagingException {
		MimeMultipart child = new MimeMultipart(alternative);
		final MimeBodyPart mbp = new MimeBodyPart();
		parent.addBodyPart(mbp);
		mbp.setContent(child);
		return child;
	}

	private void addTextVersion(Multipart mpRelatedAlternative, String messageText) throws MessagingException {
		final MimeBodyPart textPart = new MimeBodyPart();
		textPart.setContent(messageText, "text/plain");
		mpRelatedAlternative.addBodyPart(textPart);
	}

	private void addHtmlVersion(Multipart parent, String messageHtml, Set<Attachment> embeded)
			throws MessagingException {
		// HTML version
		final Multipart mpRelated = newChild(parent, "related");

		// Html
		final MimeBodyPart htmlPart = new MimeBodyPart();

		htmlPart.setContent(messageHtml, "text/html");
		mpRelated.addBodyPart(htmlPart);

		// Inline images
		addImagesInline(mpRelated, embeded);
	}

	private void addImagesInline(Multipart parent, Set<Attachment> embeded) throws MessagingException {
		if (embeded != null) {
			for (Attachment attachment : embeded) {
				final MimeBodyPart htmlPartImg = new MimeBodyPart();
				ByteArrayDataSource htmlPartImgDs = new ByteArrayDataSource(attachment.getFileUpload().getContent(),
						attachment.getFileUpload().getMimeType());
				htmlPartImg.setDataHandler(new DataHandler(htmlPartImgDs));
				String fileName = attachment.getFileUpload().getFilename();
				fileName = getFileName(fileName);

				// Gmail requires the cid have <> around it
				htmlPartImg.setHeader("Content-ID", "<" + fileName + ">");
				htmlPartImg.setDisposition(BodyPart.INLINE);
				parent.addBodyPart(htmlPartImg);
			}
		}
	}

	private void addAttachments(Multipart parent, Set<Attachment> attachments) throws MessagingException {
		if (attachments != null) {
			for (Attachment attachment : attachments) {
				final MimeBodyPart mbpAttachment = new MimeBodyPart();
				ByteArrayDataSource htmlPartImgDs = new ByteArrayDataSource(attachment.getFileUpload().getContent(),
						attachment.getFileUpload().getMimeType());
				mbpAttachment.setDataHandler(new DataHandler(htmlPartImgDs));
				String fileName = attachment.getFileUpload().getFilename();
				fileName = getFileName(fileName);
				mbpAttachment.setDisposition(BodyPart.ATTACHMENT);
				mbpAttachment.setFileName(fileName);
				parent.addBodyPart(mbpAttachment);
			}
		}
	}

	private String replaceUrlWithCids(String html, Pattern pattern, String replacement, HashMap<String, String> cids) {
		Matcher matcherCssUrl = pattern.matcher(html);
		StringBuffer sb = new StringBuffer();
		while (matcherCssUrl.find()) {
			String fileName = matcherCssUrl.group(1);
			// Disregarding file path, so don't clash your filenames!
			fileName = getFileName(fileName);
			// A cid must start with @ and be globally unique
			String cid = "@" + UUID.randomUUID().toString() + "_" + fileName;
			if (cids.containsKey(fileName))
				cid = cids.get(fileName);
			else
				cids.put(fileName, cid);
			matcherCssUrl.appendReplacement(sb, replacement.replace("@cid", cid));
		}
		matcherCssUrl.appendTail(sb);
		html = sb.toString();
		return html;
	}

	private String getFileName(String fileName) {
		if (fileName.contains("/"))
			fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
		return fileName;
	}
}