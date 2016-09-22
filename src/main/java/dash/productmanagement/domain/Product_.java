package dash.productmanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.productmanagement.domain.Product;

@StaticMetamodel(Product_.class)
public class Product_ {

	public static volatile SingularAttribute<Product, Long> id;

	public static volatile SingularAttribute<Product, Boolean> deleted;

	public static volatile SingularAttribute<Product, Boolean> deactivated;

}