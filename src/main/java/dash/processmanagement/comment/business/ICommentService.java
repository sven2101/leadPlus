package dash.processmanagement.comment.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.comment.domain.Comment;
import dash.processmanagement.domain.Process;

@Service
public interface ICommentService {
    
    void createComment(Process process, Comment comment) throws Exception;
}
