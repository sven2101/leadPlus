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
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by Andreas on 12.10.2015.
 */

@RestController
@RequestMapping("/api/rest/comments")
@Api(value = "Comment API")
public class CommentResource {

	@Autowired
	private ICommentService commentService;

	@RequestMapping(value = "/processes/{processId}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Comments for one specific process", notes = ".")
	public List<Comment> get(@ApiParam(required = true) @PathVariable long processId) throws Exception {
		return commentService.findCommentsByProcess(processId);
	}

	@ApiOperation(value = "Creates a comment.", notes = "")
	@RequestMapping(value = "/processes", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Comment createComment(@ApiParam(required = true) @RequestBody @Valid Comment comment) throws Exception {
		return commentService.createComment(comment);
	}
}
