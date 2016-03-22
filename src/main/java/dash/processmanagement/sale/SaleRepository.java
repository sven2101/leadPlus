package dash.processmanagement.sale;

import dash.processmanagement.request.RequestRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Andreas on 08.03.2016.
 */
@Repository
public interface SaleRepository extends RequestRepository <Sale, Long>{

}
