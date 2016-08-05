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

package dash.commentmanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.commentmanagement.business.ICommentService;
import dash.commentmanagement.domain.Comment;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Comment Resource")
@RequestMapping(value = "/api/rest/comments", consumes = { MediaType.ALL_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Comment API")
public class CommentResource {

	@Autowired
	private ICommentService commentService;

	@RequestMapping(value = "/processes/{processId}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Comments for one specific process", notes = ".")
	public List<Comment> getCommentsByProcess(@ApiParam(required = true) @PathVariable long processId) throws NotFoundException {
		return commentService.getCommentsByProcess(processId);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get a Comment by Id", notes = ".")
	public Comment getById(@ApiParam(required = true) @PathVariable long id) throws NotFoundException {
		return commentService.getById(id);
	}

	@ApiOperation(value = "Creates a comment.", notes = "")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Comment save(@ApiParam(required = true) @RequestBody @Valid final Comment comment) throws SaveFailedException {
		return commentService.save(comment);
	}

	@ApiOperation(value = "Updates a comment.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Comment update(@ApiParam(required = true) @RequestBody @Valid final Comment comment) throws UpdateFailedException {
		return commentService.update(comment);
	}

	@ApiOperation(value = "Delets a comment.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @RequestBody final Long id) throws DeleteFailedException {
		commentService.delete(id);
	}
}
