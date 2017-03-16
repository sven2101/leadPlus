// package dash.notificationmanagement.business.mail.test;
//
// import static org.junit.Assert.assertEquals;
// import static org.junit.Assert.assertNotNull;
// import static org.junit.Assert.assertTrue;
//
// import java.io.IOException;
//
// import javax.mail.MessagingException;
// import javax.mail.internet.MimeMessage;
//
// import org.junit.Before;
// import org.junit.Test;
//
// import com.icegreen.greenmail.util.GreenMail;
// import com.icegreen.greenmail.util.ServerSetupTest;
//
// import dash.test.BaseConfig;
//
// public class MailSmtpServer extends BaseConfig {
//
//
// @Before
// public void setUp() {
// mailServer = new GreenMail(ServerSetupTest.SMTP);
// mailServer.start();
// }
//
// @Test
// public void getMails() throws IOException, MessagingException,
// InterruptedException {
// // setup user on the mail server
// mailServer.setUser(EMAIL_USER_ADDRESS, USER_NAME, USER_PASSWORD);
//
// // fetch messages from server
// MimeMessage[] messages = mailServer.getReceivedMessages();
// assertNotNull(messages);
// assertEquals(1, messages.length);
// MimeMessage m = messages[0];
// assertEquals(EMAIL_SUBJECT, m.getSubject());
// assertTrue(String.valueOf(m.getContent()).contains(EMAIL_TEXT));
// assertEquals(EMAIL_TO, m.getFrom()[0].toString());
//
// }
// }
