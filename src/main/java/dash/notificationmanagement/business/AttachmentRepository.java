package dash.notificationmanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.notificationmanagement.domain.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

}
