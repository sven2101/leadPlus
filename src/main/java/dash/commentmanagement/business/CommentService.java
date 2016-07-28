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

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.BECAUSE_OF_USER_NOT_FOUND;
import static dash.Constants.COMMENT_NOT_FOUND;
import static dash.Constants.PROCESS_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.USER_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.containermanagement.business.ContainerService;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.processmanagement.business.ProcessRepository;
import dash.processmanagement.domain.Process;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.User;

@Service
public class CommentService implements ICommentService {

	private static final Logger logger = Logger.getLogger(CommentService.class);

	@Autowired
	private CommentRepository commentRepository;

	// TODO replace processRepository with processeService
	@Autowired
	private ProcessRepository processRepository;

	// TODO replace userRepository with userLoginService
	@Autowired
	private UserRepository userRepository;

	@Override
	public Comment saveComment(final Comment comment) throws SaveFailedException {
		if (Optional.ofNullable(comment).isPresent() && Optional.ofNullable(comment.getCreator()).isPresent()
				&& Optional.ofNullable(comment.getCreator().getId()).isPresent()) {
			final User user = userRepository.findOne(comment.getCreator().getId());
			if (Optional.ofNullable(user).isPresent()) {
				try {
					return commentRepository.save(comment);
				} catch (Exception ex) {
					logger.error(CommentService.class.getSimpleName() + ex.getMessage(), ex);
					throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
				}
			} else {
				SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
				logger.error(SAVE_FAILED_EXCEPTION + CommentService.class.getSimpleName() + BECAUSE_OF_USER_NOT_FOUND,
						new UsernameNotFoundException(USER_NOT_FOUND));
				throw sfex;
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					sfex);
			throw sfex;
		}

	}

	@Override
	public List<Comment> findCommentsByProcess(final long processId) throws NotFoundException {
		if (Optional.ofNullable(processId).isPresent()) {
			final Process process = processRepository.findOne(processId);
			if (Optional.ofNullable(process).isPresent()) {
				try {
					return commentRepository.findByProcess(process);
				} catch (Exception ex) {
					logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + ex.getMessage(), ex);
					throw new NotFoundException(COMMENT_NOT_FOUND);
				}
			} else {
				NotFoundException pnfex = new NotFoundException(PROCESS_NOT_FOUND);
				logger.error(PROCESS_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
						pnfex);
				throw pnfex;
			}
		} else {
			NotFoundException pnfex = new NotFoundException(PROCESS_NOT_FOUND);
			logger.error(PROCESS_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}
	}
}
