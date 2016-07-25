package dash.commentmanagement.business;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.exceptions.ProcessNotFoundException;
import dash.processmanagement.business.ProcessRepository;
import dash.processmanagement.domain.Process;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.User;

@Service
public class CommentService implements ICommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Comment createComment(Comment comment) throws UsernameNotFoundException {
		final User user = userRepository.findOne(comment.getCreator().getId());
		if (Optional.ofNullable(user).isPresent()) {
			return commentRepository.save(comment);
		} else {
			throw new UsernameNotFoundException("User can't be found.");
		}
	}

	@Override
	public List<Comment> findCommentsByProcess(long processId) throws Exception {
		final Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			return commentRepository.findByProcess(process);
		} else {
			throw new ProcessNotFoundException("Can't find Process.");
		}
	}

}
