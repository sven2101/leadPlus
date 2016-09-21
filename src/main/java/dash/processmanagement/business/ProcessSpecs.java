package dash.processmanagement.business;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Process_;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User_;

public class ProcessSpecs {

	public static Specification<Process> isProcessor(final long id) {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.join(Process_.processor).get(User_.id), id);
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

	public static Specification<Process> isSale() {
		return new Specification<Process>() {
			public Predicate toPredicate(Root<Process> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get(Process_.status), Status.SALE);
			}
		};
	}

}
