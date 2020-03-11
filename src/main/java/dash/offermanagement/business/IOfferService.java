
package dash.offermanagement.business;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.offermanagement.domain.Offer;

@Service
public interface IOfferService {

	public Page<Offer> getAll(Pageable pageable);

	public List<Offer> getAll();

	public Offer getOfferById(final long id) throws NotFoundException;

	public Offer save(final Offer offer) throws SaveFailedException;

	public Offer update(final Offer offer) throws UpdateFailedException;

	public void delete(final long id) throws DeleteFailedException;

	public List<Offer> getByCustomer(final long id);

}
