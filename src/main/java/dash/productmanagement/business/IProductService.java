
package dash.productmanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.productmanagement.domain.Product;

@Service
@Transactional
public interface IProductService {

	public List<Product> getAll();

	public Product getById(final Long id) throws NotFoundException;

	public Product save(final Product product) throws SaveFailedException, ConsistencyFailedException;

	public Product setImage(final long id, final MultipartFile multipartFile)
			throws NotFoundException, SaveFailedException, UpdateFailedException, ConsistencyFailedException;

	public List<Product> findByDeactivated(boolean deactivated);

	public void delete(final Long id) throws DeleteFailedException;

	public Product getProductByIdIncludeDeleted(Long id);

}
