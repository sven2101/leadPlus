package dash.processmanagement.sale;

import javax.transaction.Transactional;

import dash.processmanagement.request.RequestRepository;

/**
 * Created by Andreas on 08.03.2016.
 */
@Transactional
public interface SaleRepository extends RequestRepository <Sale, Long>{

}
