package dash.processmanagement.sale.business;

import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.domain.Sale;

import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by Andreas on 08.03.2016.
 */
@Repository
@Transactional
public interface SaleRepository extends RequestRepository <Sale, Long>{
}
