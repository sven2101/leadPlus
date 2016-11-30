package dash.sourcemanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.sourcemanagement.domain.Source;

@Service
public interface ISourceService {

	public Source save(final Source source);

	public List<Source> getAll();

	public Source getById(final Long id);
	
	public Source getByName(final String name);

	public Source update(final Source source);

	public void delete(final Long id);

}
