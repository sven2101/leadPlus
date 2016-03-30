package dash.processmanagement.sale;

import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Andreas on 08.03.2016.
 */
@Repository
@Transactional
public interface SaleRepository extends RequestRepository <Sale, Long>{
}
