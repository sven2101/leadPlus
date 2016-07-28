package dash.containermanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.containermanagement.domain.Container;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;

@Service
public interface IContainerService {

	public List<Container> getAll();

	public Container getById(final Long id) throws NotFoundException;

	public Container save(final Container container) throws SaveFailedException;

	public Container update(final Container container) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

}
