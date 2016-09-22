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

package dash.publicapi.business;

import static dash.Constants.INVALID_LEAD;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.SaveFailedException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import dash.productmanagement.business.IProductService;
import dash.productmanagement.business.ProductService;
import dash.productmanagement.domain.OrderPosition;
import dash.productmanagement.domain.Product;

@Service
@Transactional
public class PublicApiService implements IPublicApiService {

	private static final Logger logger = Logger.getLogger(ProductService.class);

	@Autowired
	private ILeadService leadservice;

	@Autowired
	private IProductService productService;

	@Override
	public void saveLead(Lead lead) throws SaveFailedException {
		if (lead != null) {
			throw new SaveFailedException(INVALID_LEAD);
		}
		if (lead.getOrderPositions() == null) {
			lead.setOrderPositions(new ArrayList<OrderPosition>());
		}
		for (OrderPosition orderPosition : lead.getOrderPositions()) {
			if (orderPosition.getProduct() == null || orderPosition.getProduct().getId() <= 0) {
				throw new SaveFailedException(INVALID_LEAD);
			}
			orderPosition.setPrice(orderPosition.getProduct().getPriceNetto());
		}
		leadservice.save(lead);
	}

	@Override
	public List<Product> getAllProducts() {
		return productService.getAll();
	}

}
