package dash.processmanagement.comment.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.comment.Comment;
import dash.processmanagement.Process;

@Service
public interface ICommentService {
    
    void createComment(Process process, Comment comment) throws Exception;
}
