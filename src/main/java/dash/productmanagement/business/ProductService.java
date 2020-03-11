/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.productmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.PRODUCT_NOT_FOUND;
import static dash.Constants.SAVE_FAILED_EXCEPTION;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.consistencymanagement.business.ConsistencyService;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.productmanagement.domain.Product;

@Service
@Transactional
public class ProductService extends ConsistencyService implements IProductService {

	private static final Logger logger = Logger.getLogger(ProductService.class);

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private IFileUploadService fileUploadService;

	@Override
	public List<Product> getAll() {
		return productRepository.findByDeletedFalse();
	}

	@Override
	public Product getById(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return productRepository.findByIdAndDeletedFalse(id);
		} else {
			NotFoundException cnfex = new NotFoundException(PRODUCT_NOT_FOUND);
			logger.error(PRODUCT_NOT_FOUND + ProductService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	@Override
	public Product save(final Product product) throws ConsistencyFailedException {
		if (product == null) {
			logger.error(SAVE_FAILED_EXCEPTION + ProductService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
			throw new IllegalArgumentException(
					SAVE_FAILED_EXCEPTION + ProductService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
		}
		this.checkConsistencyAndSetTimestamp(product, productRepository);
		if (product.getPicture() != null && product.getPicture().getId() != null) {
			product.setPicture(fileUploadService.getById(product.getPicture().getId()));
		}
		return productRepository.save(product);
	}

	@Override
	public void delete(final Long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				productRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(DELETE_FAILED_EXCEPTION + ProductService.class.getSimpleName() + erdaex.getMessage(),
						erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(DELETE_FAILED_EXCEPTION + ProductService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					dfex);
			throw dfex;
		}
	}

	@Override
	public Product setImage(final long id, MultipartFile multipartFile)
			throws NotFoundException, SaveFailedException, UpdateFailedException, ConsistencyFailedException {
		Product product = getById(id);
		product.setPicture(fileUploadService.save(multipartFile));
		return save(product);
	}

	@Override
	public List<Product> findByDeactivated(boolean deactivated) {
		return productRepository.findByDeactivatedAndDeletedFalse(deactivated);
	}

	@Override
	public Product getProductByIdIncludeDeleted(final Long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return productRepository.findOne(id);
		} else {
			NotFoundException cnfex = new NotFoundException(PRODUCT_NOT_FOUND);
			logger.error(PRODUCT_NOT_FOUND + ProductService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}
}
