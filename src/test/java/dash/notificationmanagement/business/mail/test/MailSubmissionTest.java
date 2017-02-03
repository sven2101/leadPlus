// package dash.notificationmanagement.business.mail.test;
//
// import static junit.framework.TestCase.assertEquals;
// import static org.junit.Assert.assertTrue;
//
// import java.io.IOException;
// import java.security.GeneralSecurityException;
//
// import javax.mail.BodyPart;
// import javax.mail.Folder;
// import javax.mail.Message;
// import javax.mail.MessagingException;
// import javax.mail.Multipart;
// import javax.mail.Store;
//
// import org.junit.Assert;
// import org.junit.Rule;
// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
// import org.springframework.core.annotation.Order;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.context.junit4.SpringRunner;
//
// import com.icegreen.greenmail.junit.GreenMailRule;
// import com.icegreen.greenmail.util.ServerSetupTest;
//
// @RunWith(SpringRunner.class)
// @ActiveProfiles("test")
// @Order(value = 2)
// @SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
// public class MailSubmissionTest {
//
// private final static String MAIL_EMAIL_ADRESS = "test@email.com";
// private final static String MAIL_IMAP_USERNAME = "emailUser";
// private final static String MAIL_IMAP_PASSWORD = "emailPassword";
//
// @Rule
// public final GreenMailRule greenMail = new
// GreenMailRule(ServerSetupTest.SMTP_IMAP);
//
// @Test
// public void sendAndFetchMailMessageWithInlineAttachment()
// throws IOException, MessagingException, GeneralSecurityException {
// greenMail.setUser(MAIL_EMAIL_ADRESS, MAIL_IMAP_USERNAME, MAIL_IMAP_PASSWORD);
// fetchEmailWithInlineAttachment();
// }
//
// private void fetchEmailWithInlineAttachment() throws MessagingException,
// GeneralSecurityException, IOException {
// Store store = connectToIMAPServer();
// Folder folder = openFolder(store, "INBOX");
//
// Message[] messages = folder.getMessages();
// assertEquals(1, messages.length);
// assertTrue(messages[0].getContentType().startsWith("multipart/mixed;"));
//
// final Multipart part = (Multipart) messages[0].getContent();
// assertEquals(1, part.getCount());
//
// final BodyPart bodyPart = part.getBodyPart(0);
// assertEquals("TEXT/PLAIN; charset=us-ascii", bodyPart.getContentType());
// Assert.assertEquals("This is some text to be displayed inline",
// bodyPart.getContent());
// }
//
// private Folder openFolder(Store store, String folderName) throws
// MessagingException {
// Folder folder = store.getDefaultFolder();
// folder = folder.getFolder(folderName);
// folder.open(Folder.READ_WRITE);
// return folder;
// }
//
// private Store connectToIMAPServer() throws GeneralSecurityException,
// MessagingException {
// Store store = greenMail.getImap().createStore();
// store.connect(MAIL_IMAP_USERNAME, MAIL_IMAP_PASSWORD);
//
// return store;
// }
//
// }
