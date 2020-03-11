package dash.fileuploadmanagement.business;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.fileuploadmanagement.domain.FileUpload;

@Service
public interface IFileUploadService {

	public FileUpload save(final MultipartFile multipartFile) throws SaveFailedException;

	public FileUpload save(final FileUpload fileUpload) throws SaveFailedException;

	public void delete(final Long id) throws DeleteFailedException;

	public FileUpload getById(final Long id) throws NotFoundException;

}
