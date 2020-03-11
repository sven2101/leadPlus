
package dash.notificationmanagement.business;

import static dash.Constants.ATTACHMENT_NOT_FOUND;
import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.notificationmanagement.domain.Attachment;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;

@Service
public class AttachmentService implements IAttachmentService {

	private static final Logger logger = Logger.getLogger(AttachmentService.class);

	@Autowired
	private AttachmentRepository attachmentRepository;

	@Override
	public Attachment save(Attachment attachment) throws SaveFailedException {
		if (attachment != null) {
			return attachmentRepository.save(attachment);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + AttachmentService.class.getSimpleName());
			throw sfex;
		}
	}

	@Override
	public Attachment getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return attachmentRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(ATTACHMENT_NOT_FOUND + AttachmentService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID,
						ex);
				throw new NotFoundException(ATTACHMENT_NOT_FOUND);
			}
		} else {
			NotFoundException nfex = new NotFoundException(ATTACHMENT_NOT_FOUND);
			logger.error(ATTACHMENT_NOT_FOUND + AttachmentService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID, nfex);
			throw nfex;
		}
	}
}
