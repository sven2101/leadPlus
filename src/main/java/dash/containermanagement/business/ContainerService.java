package dash.containermanagement.business;

import static dash.Constants.CONTAINER_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.containermanagement.domain.Container;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;

@Service
public class ContainerService implements IContainerService {

	private static final Logger logger = Logger.getLogger(ContainerService.class);

	@Autowired
	private ContainerRepository containerRepository;

	@Override
	public List<Container> getAll() {
		return containerRepository.findAll();
	}

	@Override
	public Container getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return containerRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + ex.getMessage(), ex);
				throw new NotFoundException(CONTAINER_NOT_FOUND);
			}
		} else {
			NotFoundException cnfex = new NotFoundException(CONTAINER_NOT_FOUND);
			logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					cnfex);
			throw cnfex;
		}
	}

	@Override
	public Container save(final Container container) throws SaveFailedException {
		if (Optional.ofNullable(container).isPresent()) {
			try {
				return containerRepository.save(container);
			} catch (Exception ex) {
				logger.error(ContainerService.class.getSimpleName() + ex.getMessage(), ex);
				throw new SaveFailedException(SAVE_FAILED_EXCEPTION);
			}
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					sfex);
			throw sfex;
		}
	}

	@Override
	public Container update(final Container container) throws UpdateFailedException {
		if (Optional.ofNullable(container).isPresent()) {
			Container updateContainer;
			try {
				updateContainer = containerRepository.findOne(container.getId());
				updateContainer.setDescription(container.getDescription());
				updateContainer.setName(container.getName());
				updateContainer.setPriceNetto(container.getPriceNetto());
				return containerRepository.save(updateContainer);
			} catch (IllegalArgumentException iaex) {
				logger.error(UPDATE_FAILED_EXCEPTION + ContainerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID,
						iaex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			} catch (Exception ex) {
				logger.error(UPDATE_FAILED_EXCEPTION + ContainerService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}

		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				containerRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(DELETE_FAILED_EXCEPTION + ContainerService.class.getSimpleName() + erdaex.getMessage(),
						erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			} catch (Exception ex) {
				logger.error(DELETE_FAILED_EXCEPTION + ContainerService.class.getSimpleName(), ex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(DELETE_FAILED_EXCEPTION + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					dfex);
			throw dfex;
		}
	}
}
