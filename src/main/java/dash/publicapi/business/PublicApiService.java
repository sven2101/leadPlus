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

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.SaveFailedException;
import dash.leadmanagement.business.ILeadService;
import dash.leadmanagement.domain.Lead;
import dash.productmanagement.business.ProductService;

@Service
@Transactional
public class PublicApiService implements IPublicApiService {

	private static final Logger logger = Logger.getLogger(ProductService.class);

	@Autowired
	private ILeadService leadservice;

	@Override
	public void saveLead(Lead lead) throws SaveFailedException {
		leadservice.save(lead);

	}

}
