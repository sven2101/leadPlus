/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.commentmanagement.business;

import static dash.Constants.PROCESS_NOT_FOUND;
import static dash.Constants.USER_NOT_FOUND;

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
			throw new UsernameNotFoundException(USER_NOT_FOUND);
		}
	}

	@Override
	public List<Comment> findCommentsByProcess(long processId) throws ProcessNotFoundException {
		final Process process = processRepository.findOne(processId);
		if (Optional.ofNullable(process).isPresent()) {
			return commentRepository.findByProcess(process);
		} else {
			throw new ProcessNotFoundException(PROCESS_NOT_FOUND);
		}
	}

}
