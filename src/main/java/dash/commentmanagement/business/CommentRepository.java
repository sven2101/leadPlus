
package dash.commentmanagement.business;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import dash.commentmanagement.domain.Comment;
import dash.processmanagement.domain.Process;

public interface CommentRepository extends CrudRepository<Comment, Long> {

	List<Comment> findByProcess(Process process);
}
