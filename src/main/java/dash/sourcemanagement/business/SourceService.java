package dash.sourcemanagement.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.sourcemanagement.domain.Source;

@Service
public class SourceService implements ISourceService {

	@Autowired
	private SourceRepository sourceRepository;

	@Override
	public Source save(Source source) {
		if (null == source || source.getName() == null)
			throw new IllegalArgumentException();
		return sourceRepository.save(source);
	}

	@Override
	public List<Source> getAll() {
		return sourceRepository.findAll();
	}

	@Override
	public Source getById(Long id) {
		return sourceRepository.findOne(id);
	}

	@Override
	public Source update(Source source) {
		return save(source);
	}

	@Override
	public void delete(Long id) {
		sourceRepository.delete(id);
	}

	@Override
	public Source getByName(String name) {
		if (null == name)
			throw new IllegalArgumentException();
		return sourceRepository.findByNameIgnoreCase(name);
	}
}
