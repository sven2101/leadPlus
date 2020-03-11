package dash.sourcemanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.ConsistencyFailedException;
import dash.security.jwt.domain.ApiJwtToken;
import dash.sourcemanagement.domain.Source;

@Service
public interface ISourceService {

	public Source save(final Source source) throws ConsistencyFailedException;

	public List<Source> getAll();

	public Source getById(final Long id);

	public Source getByName(final String name);

	public void delete(final Long id);

	public ApiJwtToken generateApiTokenBySourceId(Long id) throws ConsistencyFailedException;

}
