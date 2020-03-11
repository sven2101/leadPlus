package dash.notificationmanagement.business;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.notificationmanagement.domain.Notification;
import dash.statusmanagement.domain.Status;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	List<Notification> findTop5BySenderIdAndProcessStatusNotOrderByTimestampDesc(Long userId, Status status);

}
