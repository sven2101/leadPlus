package dash.commentmanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;

@Service
public interface ICommentService {

	Comment createComment(Comment comment) throws Exception;

	List<Comment> findCommentsByProcess(long processId) throws Exception;
}
