package dash.processmanagement.commentmanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * Created by Andreas on 12.10.2015.
 */

@RestController
@RequestMapping("/api/rest/comment")
@Api(value = "comments", description = "Comment API")
public class CommentResource {
	
	@Autowired
    private CommentRepository commentRepository;

    @RequestMapping(value="/comments",
                    method = RequestMethod.GET,
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all Comments", notes = ".")
    public Iterable<Comment> get() {
            return commentRepository.findAll();
    }

    @RequestMapping(value="/comments/{id}",
                    method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get a single comment.", notes = "You have to provide a valid comment ID.")
    public Comment findById(@ApiParam(required=true) @PathVariable Long id) {
            return commentRepository.findOne(id);
    }
    
    @RequestMapping(value="/comments/lead/{id}",
            	method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "lead id", notes = "You have to provide a valid lead ID.")
    public List<Comment> findByLead(@ApiParam(required=true) @PathVariable Long leadId) {
	return commentRepository.findByLead(leadId);
    }
    
    @ApiOperation(value = "Delete a single comment.", notes = "")
    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
	commentRepository.delete(id);
    }

}
