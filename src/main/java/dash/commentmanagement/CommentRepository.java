package dash.commentmanagement;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long>{

	public List<Comment>findByLead(Long leadId);
}
