package dash.processmanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;

@StaticMetamodel(Process.class)
public class Process_ {

	public static volatile SingularAttribute<Process, Lead> lead;

	public static volatile SingularAttribute<Process, Offer> offer;

	public static volatile SingularAttribute<Process, Sale> sale;

	public static volatile SingularAttribute<Process, Long> id;

	public static volatile SingularAttribute<Process, Status> status;

	public static volatile SingularAttribute<Process, User> processor;

}