package dash.sourcemanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.sourcemanagement.domain.Source;

public interface SourceRepository extends JpaRepository<Source, Long> {

}
