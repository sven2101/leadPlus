package dash.usermanagement.password.forgot.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.usermanagement.password.forgot.domain.PasswordForgot;

@Repository
public interface PasswordForgotRepository extends JpaRepository<PasswordForgot, Long> {

	public PasswordForgot findByRandomKey(String randomKey);
}
