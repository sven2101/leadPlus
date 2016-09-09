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
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.PROCESS_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.USER_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.domain.Process;
import dash.usermanagement.business.IUserService;
import dash.usermanagement.domain.User;

@Service
public class CommentService implements ICommentService {

	private static final Logger logger = Logger.getLogger(CommentService.class);

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private IProcessService processService;

	@Autowired
	private IUserService userService;

	@Override
	public Comment save(final Comment comment, final Long processId) throws SaveFailedException {
		if (processId > 0 && Optional.ofNullable(comment).isPresent()
				&& Optional.ofNullable(comment.getCreator()).isPresent()
				&& Optional.ofNullable(comment.getCreator().getId()).isPresent()) {
			try {
				final User user = userService.getById(comment.getCreator().getId());
				final Process process = processService.getById(processId);
				if (Optional.ofNullable(user).isPresent() && process != null) {
					comment.setProcess(process);
					return commentRepository.save(comment);
				} else {
					SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
					logger.error(
							SAVE_FAILED_EXCEPTION + CommentService.class.getSimpleName() + BECAUSE_OF_USER_NOT_FOUND,
							new UsernameNotFoundException(USER_NOT_FOUND));
					throw sfex;
				}
			} catch (NotFoundException nfex) {
				logger.error(CommentService.class.getSimpleName() + nfex.getMessage(), nfex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					sfex);
			throw sfex;
		}
	}

	@Override
	public List<Comment> getCommentsByProcess(final long processId) throws NotFoundException {
		if (Optional.ofNullable(processId).isPresent()) {
			final Process process = processService.getById(processId);
			if (Optional.ofNullable(process).isPresent()) {
				return commentRepository.findByProcess(process);
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

	@Override
	public Comment update(final Comment comment) throws UpdateFailedException {
		if (Optional.ofNullable(comment).isPresent()) {
			try {
				return save(comment, comment.getProcess().getId());
			} catch (IllegalArgumentException | SaveFailedException ex) {
				logger.error(ex.getMessage() + CommentService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(COMMENT_NOT_FOUND);
			logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public Comment getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return commentRepository.findOne(id);
		} else {
			NotFoundException cnfex = new NotFoundException(COMMENT_NOT_FOUND);
			logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				commentRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

	@Override
	public void deleteByProcess(final Process process) throws DeleteFailedException {
		if (process != null) {
			try {
				for (Comment comment : commentRepository.findByProcess(process)) {
					commentRepository.delete(comment);
				}
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(COMMENT_NOT_FOUND + CommentService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}
}
