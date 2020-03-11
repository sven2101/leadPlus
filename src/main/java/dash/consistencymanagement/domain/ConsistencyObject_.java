package dash.consistencymanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(ConsistencyObject.class)
public class ConsistencyObject_ {
	public static volatile SingularAttribute<ConsistencyObject, Boolean> deleted;
	public static volatile SingularAttribute<ConsistencyObject, Long> id;
}