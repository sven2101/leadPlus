package dash.containermanagement.business;

import static dash.Constants.CONTAINER_NOT_FOUND;
import static dash.Constants.BECAUSE_OF_ILLEGAL_ID;
import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;

import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.containermanagement.domain.Container;
import dash.exceptions.ContainerNotFoundException;

@Service
public class ContainerService implements IContainerService {

	private static final Logger logger = Logger.getLogger(ContainerService.class);

	@Autowired
	private ContainerRepository containerRepository;

	@Override
	public Iterable<Container> getAll() {
		return containerRepository.findAll();
	}

	@Override
	public Container getById(final Long id) throws ContainerNotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				return containerRepository.findOne(id);
			} catch (Exception ex) {
				logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + ex.getMessage(), ex);
				throw new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			}
		} else {
			ContainerNotFoundException cnfex = new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					cnfex);
			throw cnfex;
		}
	}

	@Override
	public Container save(final Container container) throws ContainerNotFoundException {
		if (Optional.ofNullable(container).isPresent()) {
			try {
				return containerRepository.save(container);
			} catch (Exception ex) {
				logger.error(ContainerService.class.getSimpleName() + ex.getMessage(), ex);
				return null;
			}
		} else {
			ContainerNotFoundException cnfex = new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					cnfex);
			throw cnfex;
		}
	}

	@Override
	public Container update(final Container container) throws ContainerNotFoundException {
		if (Optional.ofNullable(container).isPresent()) {
			Container updateContainer;
			try {
				updateContainer = containerRepository.findOne(container.getId());
				updateContainer.setDescription(container.getDescription());
				updateContainer.setName(container.getName());
				updateContainer.setPriceNetto(container.getPriceNetto());
				return containerRepository.save(updateContainer);
			} catch (IllegalArgumentException iaex) {
				logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_ILLEGAL_ID,
						iaex);
				throw new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			}
		} else {
			ContainerNotFoundException cnfex = new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					cnfex);
			throw cnfex;
		}
	}

	@Override
	public void delete(final Long id) throws ContainerNotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				containerRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + erdaex.getMessage(),
						erdaex);
				throw new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			}
		} else {
			ContainerNotFoundException cnfex = new ContainerNotFoundException(CONTAINER_NOT_FOUND);
			logger.error(CONTAINER_NOT_FOUND + ContainerService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					cnfex);
			throw cnfex;
		}
	}
}
