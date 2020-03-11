package dash.common;

import java.util.Calendar;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.customermanagement.domain.Customer;

@StaticMetamodel(AbstractWorkflow.class)
public class AbstractWorkflow_ {
	public static volatile SingularAttribute<AbstractWorkflow, Calendar> timestamp;

	public static volatile SingularAttribute<AbstractWorkflow, Customer> customer;

	public static volatile SingularAttribute<AbstractWorkflow, String> deliveryAddressLine;
}