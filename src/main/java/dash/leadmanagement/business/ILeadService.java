
package dash.leadmanagement.business;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.domain.Lead;

@Service
public interface ILeadService {

	public Page<Lead> getPages(Pageable pageable);

	public List<Lead> getAll();

	public Lead getLeadById(final Long id) throws NotFoundException;

	public Lead save(final Lead lead) throws SaveFailedException;

	public Lead update(final Lead lead) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

	public List<Lead> getByCustomer(Long id);
}
