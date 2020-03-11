
package dash.commentmanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.commentmanagement.domain.Comment;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.processmanagement.domain.Process;

@Service
public interface ICommentService {

	public Comment getById(final Long id) throws NotFoundException;

	public Comment save(final Comment comment, final Long processId) throws SaveFailedException;

	public Comment update(final Comment comment) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

	public List<Comment> getCommentsByProcess(final long processId) throws NotFoundException;

	public void deleteByProcess(Process process) throws DeleteFailedException;
}
