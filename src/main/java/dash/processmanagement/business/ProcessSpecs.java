package dash.processmanagement.business;

import java.util.Calendar;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.SingularAttribute;

import org.springframework.data.jpa.domain.Specification;

import dash.common.AbstractWorkflow;
import dash.common.AbstractWorkflow_;
import dash.customermanagement.domain.Customer;
import dash.consistencymanagement.domain.ConsistencyObject_;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Process_;
import dash.processmanagement.domain.Processor_;
import dash.statusmanagement.domain.Status;

public class ProcessSpecs {

	public static Specification<Process> isProcessor(final long id) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.join(Process_.processor).get(ConsistencyObject_.id), id);
			}

		};
	}

	public static Specification<Process> hasProcessorInDistinct(final long id) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				query.distinct(true);
				return builder.equal(root.join(Process_.formerProcessors).join(Processor_.user).get(ConsistencyObject_.id), id);
			}
		};
	}

	public static Specification<Process> isClosed() {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get(Process_.status), Status.CLOSED);
			}
		};
	}

	public static Specification<Process> hasStatus(final Status status) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get(Process_.status), status);
			}
		};
	}

	public static Specification<Process> isDeleted(boolean isDeleted) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get(ConsistencyObject_.deleted), isDeleted);
			}
		};
	}

	public static Specification<Process> isSale() {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get(Process_.status), Status.SALE);
			}
		};
	}

	public static Specification<Process> containsSearchTextInCustomer(
			SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute,
			SingularAttribute<Customer, String> customerAttribute, String searchText) {

		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				final String tmpSearchtext = "%" + searchText + "%";
				return builder.like(
						root.join(abstractWorkflowAttribute).join(AbstractWorkflow_.customer).get(customerAttribute),
						tmpSearchtext);
			}
		};
	}

	public static Specification<Process> containsSearchTextInStatus(

			String searchText) {

		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				final String tmpSearchtext = "%" + searchText + "%";
				return builder.like(root.get(Process_.status).as(String.class), tmpSearchtext);
			}
		};
	}

	public static Specification<Process> containsSearchTextInWorkflow(
			SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute,
			SingularAttribute<AbstractWorkflow, String> workflowAttribute, String searchText) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				final String tmpSearchtext = "%" + searchText + "%";
				return builder.like(root.join(abstractWorkflowAttribute).get(workflowAttribute), tmpSearchtext);
			}
		};
	}

	public static Specification<Process> isBetweenTimestamp(final Calendar from, final Calendar until,
			SingularAttribute<Process, AbstractWorkflow> abstractWorkflowAttribute) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.between(root.join(abstractWorkflowAttribute).get(AbstractWorkflow_.timestamp), from,
						until);
			}
		};
	}

}
