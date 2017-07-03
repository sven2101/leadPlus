package dash.customermanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Customer.class)
public class Customer_ {

	public static volatile SingularAttribute<Customer, Long> id;

	public static volatile SingularAttribute<Customer, Boolean> deleted;

	public static volatile SingularAttribute<Customer, Boolean> deactivated;

	public static volatile SingularAttribute<Customer, String> firstname;

	public static volatile SingularAttribute<Customer, String> lastname;

	public static volatile SingularAttribute<Customer, String> company;

	public static volatile SingularAttribute<Customer, String> email;

	public static volatile SingularAttribute<Customer, String> fax;

}