package dash.processmanagement.comment.service;

import java.util.Calendar;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.processmanagement.comment.Comment;
import dash.processmanagement.comment.CommentRepository;
import dash.usermanagement.User;
import dash.usermanagement.UserRepository;

import dash.processmanagement.Process;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentRepository 	commentRepository;
    
    @Autowired
    private UserRepository 	userRepository;
    
    public void createComment(Process process, Comment comment) throws UsernameNotFoundException {
	
	final User user 	= userRepository.findOne(comment.getUser().getId());
	if (Optional.ofNullable(user).isPresent()){	
	    commentRepository.save(new Comment(process, user, comment.getCommentText(), Calendar.getInstance()));
	} else {
	    throw new UsernameNotFoundException("User can't be found.");
	}		
    }
}
