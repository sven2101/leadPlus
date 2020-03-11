
package dash.notificationmanagement.business;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.notificationmanagement.domain.Attachment;

public interface IAttachmentService {

	public Attachment save(final Attachment attachment) throws SaveFailedException;

	public Attachment getById(final Long id) throws NotFoundException;

}
