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

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.productmanagement.domain.Product;

@Service
@Transactional
public interface IProductService {

	public List<Product> getAll();

	public Product getById(final Long id) throws NotFoundException;

	public Product save(final Product product) throws SaveFailedException, ConsistencyFailedException;

	public Product setImage(final long id, final MultipartFile multipartFile)
			throws NotFoundException, SaveFailedException, UpdateFailedException, ConsistencyFailedException;

	public List<Product> findByDeactivated(boolean deactivated);

	public void delete(final Long id) throws DeleteFailedException;

	public Product getProductByIdIncludeDeleted(Long id);

}
