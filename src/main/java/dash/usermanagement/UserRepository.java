package dash.usermanagement;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Andreas on 12.10.2015.
 */
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}