package dash.containermanagement.business;

import org.springframework.stereotype.Service;

import dash.containermanagement.domain.Container;
import dash.exceptions.ContainerNotFoundException;

@Service
public interface IContainerService {

	public Iterable<Container> getAll();

	public Container getById(final Long id) throws ContainerNotFoundException;

	public Container save(final Container container) throws ContainerNotFoundException;

	public Container update(final Container container) throws ContainerNotFoundException;

	public void delete(final Long id) throws ContainerNotFoundException;

}
