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

package dash.statisticmanagement.olap.business;

import java.util.Calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.domain.OLAP;

@Repository
@Transactional
public interface OlapRepository extends JpaRepository<OLAP, Long> {
	OLAP findTopByDateRangeOrderByTimestampDesc(DateRange daterange);
	
	void deleteByTimestampBefore(Calendar timestamp);
}