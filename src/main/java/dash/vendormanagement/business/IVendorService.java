package dash.vendormanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.vendormanagement.domain.Vendor;

@Service
public interface IVendorService {

	public List<Vendor> getAll();

	public Vendor getById(final Long id) throws NotFoundException;

	public Vendor save(final Vendor vendor) throws SaveFailedException;

	public Vendor update(final Vendor vendor) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;
}
