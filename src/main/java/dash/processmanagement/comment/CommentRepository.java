package dash.processmanagement.comment;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long>{

	public List<Comment> findCommentsByProcess(Long process);
}
