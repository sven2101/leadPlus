package dash.processmanagement.comment.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.comment.Comment;

@Service
public interface ICommentService {
    
    public void createComment(Long processId, Comment comment) throws Exception;
}
