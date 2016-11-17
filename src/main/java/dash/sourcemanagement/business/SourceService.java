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
		if (null == source)
			return null;
		return sourceRepository.save(source);
	}

	@Override
	public List<Source> getAll() {
		return sourceRepository.findAll();
	}

	@Override
	public Source getById(Long id) {
		if (null == id)
			return null;
		return sourceRepository.findOne(id);
	}

	@Override
	public Source update(Source source) {
		return save(source);
	}

	@Override
	public void delete(Long id) {
		if (null == id)
			return;
		sourceRepository.delete(id);
	}

	@Override
	public Source getByName(String name) {
		if (null == name)
			return null;
		return sourceRepository.findByName(name);
	}
}
