package dash.common;

import java.util.Calendar;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(AbstractWorkflow.class)
public class AbstractWorkflow_ {
	public static volatile SingularAttribute<AbstractWorkflow, Calendar> timestamp;
}