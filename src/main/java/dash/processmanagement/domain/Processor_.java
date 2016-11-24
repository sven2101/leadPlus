package dash.processmanagement.domain;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import dash.usermanagement.domain.User;

@StaticMetamodel(Processor.class)
public class Processor_ {

	public static volatile SingularAttribute<Processor, User> user;

}
