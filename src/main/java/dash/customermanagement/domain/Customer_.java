package dash.customermanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.productmanagement.domain.Product;

@StaticMetamodel(Customer.class)
public class Customer_ {

	public static volatile SingularAttribute<Product, Long> id;

	public static volatile SingularAttribute<Product, Boolean> deleted;

	public static volatile SingularAttribute<Product, Boolean> deactivated;

}