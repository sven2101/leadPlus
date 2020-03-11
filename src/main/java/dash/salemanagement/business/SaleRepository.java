
package dash.salemanagement.business;

import java.util.List;

import dash.processmanagement.request.RequestRepository;
import dash.salemanagement.domain.Sale;

//@Repository
//@Transactional
public interface SaleRepository extends RequestRepository<Sale, Long> {

	List<Sale> findByCustomerIdAndDeleted(Long id, boolean deleted);
	
	List<Sale> findByInvoiceNumber(String invoiceNumber);

}
