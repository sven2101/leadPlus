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

package dash.leadmanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import dash.leadmanagement.domain.Lead;
import dash.processmanagement.request.RequestRepository;

@Transactional
@Repository
public interface LeadRepository extends RequestRepository<Lead, Long> {

	List<Lead> findByCustomerId(Long id);
}
