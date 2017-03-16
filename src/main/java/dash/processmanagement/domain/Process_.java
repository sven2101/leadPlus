package dash.processmanagement.domain;

import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.common.AbstractWorkflow;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;

@StaticMetamodel(Process.class)
public class Process_ {

	public static volatile SingularAttribute<Process, AbstractWorkflow> lead;

	public static volatile SingularAttribute<Process, AbstractWorkflow> offer;

	public static volatile SingularAttribute<Process, AbstractWorkflow> sale;

	public static volatile SingularAttribute<Process, Long> id;

	public static volatile SingularAttribute<Process, Boolean> deleted;

	public static volatile SingularAttribute<Process, Status> status;

	public static volatile SingularAttribute<Process, User> processor;

	public static volatile SetAttribute<Process, Processor> formerProcessors;

}