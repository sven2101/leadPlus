package dash.processmanagement.comment;

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

import dash.processmanagement.comment.service.ICommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * Created by Andreas on 12.10.2015.
 */

@RestController
@RequestMapping("/api/rest/processes")
@Api(value = "Comment API")
public class CommentResource {
	
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private ICommentService commentService;
    
    @RequestMapping(value = "/{processId}/comments/",
	    	    method = RequestMethod.GET,
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Comments", notes = ".")
    public List<Comment> get(@PathVariable Long processId) {	
	return commentRepository.findCommentsByProcess(processId);
    }
    
    @RequestMapping(value = "/{processId}/comments/",
    	    method = RequestMethod.POST,
    	    consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Get all Comments", notes = ".")
    public void add(@PathVariable Long processId, @RequestBody @Valid Comment comment) {	
	try {
	    commentService.createComment(processId, comment);
	} catch(Exception ex){
	    
	}
    }

}
