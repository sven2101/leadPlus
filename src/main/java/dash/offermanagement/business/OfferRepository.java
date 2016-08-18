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

package dash.offermanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.RequestRepository;

@Transactional
@Repository
public interface OfferRepository extends RequestRepository<Offer, Long> {

	List<Offer> findByCustomerId(Long id);

}
