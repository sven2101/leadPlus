
package dash.productmanagement.business;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.productmanagement.domain.Product;

//@Repository
//@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {
	Product findByNameIgnoreCase(String name);

	public List<Product> findByDeactivatedAndDeletedFalse(boolean deactivated);

	public List<Product> findByDeletedFalse();

	public Product findByIdAndDeletedFalse(Long id);
}