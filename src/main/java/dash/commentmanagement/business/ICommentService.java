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

import java.util.List;

import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;

@Service
public interface ICommentService {

	public Comment getById(final Long id) throws NotFoundException;

	public Comment save(final Comment comment) throws SaveFailedException;

	public Comment update(final Comment comment) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

	public List<Comment> getCommentsByProcess(final long processId) throws NotFoundException;
}
