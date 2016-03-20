package dash.processmanagement.comment.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.Process;
import dash.processmanagement.ProcessRepository;
import dash.processmanagement.comment.Comment;
import dash.processmanagement.comment.CommentRepository;
import dash.usermanagement.User;
import dash.usermanagement.UserRepository;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProcessRepository processRepository;
    
    public void createComment(Long processId, Comment comment) throws Exception {
	
	final Process process 	= processRepository.findOne(processId);
	final User user 	= userRepository.findOne(comment.getUser().getId());

	if (process != null && user != null){	
	    commentRepository.save(new Comment(process, user, comment.getCommentText(), new Date()));
	} else {
	    throw new Exception("Comment couldn't be created.");
	}		
    }
}
