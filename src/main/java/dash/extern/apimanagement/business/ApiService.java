package dash.extern.apimanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dash.common.Encryptor;
import dash.common.FailedToEncryptCipherTextException;
import dash.consistencymanagement.business.ConsistencyService;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.extern.apimanagement.domain.Api;
import dash.extern.apimanagement.domain.ApiVendor;

@Service
public class ApiService extends ConsistencyService {

	private static final Logger logger = Logger.getLogger(ApiService.class);

	private ApiRepository apiRepository;

	@Autowired
	public ApiService(ApiRepository apiRepository) {
		this.apiRepository = apiRepository;
	}

	public List<Api> getAll() {
		return apiRepository.findAll();
	}

	public Api getById(final Long id) throws NotFoundException {
		if (id != null) {
			return apiRepository.findOne(id);
		} else {
			NotFoundException cnfex = new NotFoundException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + ApiService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public Api save(final Api api) throws FailedToEncryptCipherTextException, ConsistencyFailedException,
			NotFoundException, IllegalArgumentException {
		if (api == null) {
			logger.error(SAVE_FAILED_EXCEPTION + ApiService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
			throw new IllegalArgumentException(
					SAVE_FAILED_EXCEPTION + ApiService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
		}
		this.checkConsistencyAndSetTimestamp(api, apiRepository);
		Api encryptedApi = null;
		if (!api.isDecrypted()) {
			Api tmpApi = getById(api.getId());
			encryptedApi = api;
			encryptedApi.setPassword(tmpApi.getPassword());
			encryptedApi.setSalt(tmpApi.getSalt());
			encryptedApi.setIv(tmpApi.getIv());
		} else {
			encryptedApi = (Api) Encryptor.encrypt(api);
		}
		return apiRepository.save(encryptedApi);

	}

	public void delete(final Long id) throws DeleteFailedException {
		if (id != null) {
			try {
				apiRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(DELETE_FAILED_EXCEPTION + ApiService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(DELETE_FAILED_EXCEPTION + ApiService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}
	}

	public List<Api> getByApiVendor(ApiVendor apiVendor) throws DeleteFailedException {
		return apiRepository.findByIsDeactivatedFalseAndIsVerifiedTrueAndApiVendor(apiVendor);
	}
}
