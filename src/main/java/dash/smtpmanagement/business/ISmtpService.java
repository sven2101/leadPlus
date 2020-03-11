
package dash.smtpmanagement.business;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.smtpmanagement.domain.Smtp;

@Service
public interface ISmtpService {

	public Smtp save(final Smtp smtp, String smtpKey)
			throws SaveFailedException, UnsupportedEncodingException, Exception;

	public Smtp test(final Long smtpId)
			throws UnsupportedEncodingException, MessagingException, NotFoundException, Exception;

	public Smtp findByAuthenticatedUser() throws NotFoundException;

	Smtp findByUserId(long userId) throws NotFoundException;

}
