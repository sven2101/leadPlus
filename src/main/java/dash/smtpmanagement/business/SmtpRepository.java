
package dash.smtpmanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.domain.User;

public interface SmtpRepository extends JpaRepository<Smtp, Long> {

	public Smtp findByUser(User user);

	public Smtp findByUserId(Long id);

	public Smtp findByUserUsername(String username);
}
