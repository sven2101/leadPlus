package dash.templatemanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dash.templatemanagement.domain.Template;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

}
