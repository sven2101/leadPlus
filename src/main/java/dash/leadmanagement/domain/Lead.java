
package dash.leadmanagement.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import dash.common.AbstractWorkflow;

@Entity
@SQLDelete(sql = "UPDATE lead SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "lead")
public class Lead extends AbstractWorkflow {

	public Lead() {
	}

}
