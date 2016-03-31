package dash.processmanagement.comment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

    List<Comment> findCommentsByProcess(Long process);
}
