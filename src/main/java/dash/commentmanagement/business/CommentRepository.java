package dash.commentmanagement.business;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import dash.commentmanagement.domain.Comment;
import dash.processmanagement.domain.Process;

@Transactional
@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

	List<Comment> findByProcess(Process process);
}
