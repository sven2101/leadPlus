package dash.processmanagement.comment.business;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.processmanagement.comment.domain.Comment;
import dash.processmanagement.domain.Process;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.User;

@Service
public class CommentService implements ICommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public void createComment(Process process, Comment comment) throws UsernameNotFoundException {
		final User user = userRepository.findOne(comment.getCreator().getId());
		if (Optional.ofNullable(user).isPresent()) {
			commentRepository.save(comment);
		} else {
			throw new UsernameNotFoundException("User can't be found.");
		}
	}
}
