package dash.processmanagement.comment.rest;

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

import dash.processmanagement.comment.business.CommentRepository;
import dash.processmanagement.comment.domain.Comment;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by Andreas on 12.10.2015.
 */

@RestController
@RequestMapping("/api/rest/comments/")
@Api(value = "Comment API")
public class CommentResource {

	@Autowired
	private CommentRepository commentRepository;

	@RequestMapping(value = "/{processId}/comments/", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get all Comments", notes = ".")
	public List<Comment> get(@ApiParam(required = true) @PathVariable Long processId) {
		return commentRepository.findCommentsByProcess(processId);
	}

	@ApiOperation(value = "Creates a comment.", notes = "")
	@RequestMapping(value = "/{processId}/comments", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public Comment createProcess(@ApiParam(required = true) @RequestBody @Valid Comment comment) throws Exception {
		return commentRepository.save(comment);
	}
}
