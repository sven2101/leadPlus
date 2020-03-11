
package dash.publicapi.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.leadmanagement.domain.Lead;
import dash.productmanagement.domain.Product;

@Service
@Transactional
public interface IPublicApiService {

	Lead saveLead(Lead lead) throws SaveFailedException, NotFoundException, ConsistencyFailedException;

	List<Product> findByDeactivated(boolean deactivated);

}
