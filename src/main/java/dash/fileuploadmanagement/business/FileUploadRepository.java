package dash.fileuploadmanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.fileuploadmanagement.domain.FileUpload;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {

}
