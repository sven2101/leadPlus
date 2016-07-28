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

package dash.processmanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.domain.User;

@Service
public interface IProcessService {

	List<?> getElementsByStatus(Status status, String kind);

	void createProcesses(List<Process> processes);

	Process createProcess(Process process);

	Lead createLead(Long processId, Lead lead) throws NotFoundException;

	Offer createOffer(Long processId, Offer offer) throws NotFoundException;

	Sale createSale(Long processId, Sale sale) throws NotFoundException;

	User createProcessor(Long processId, String username) throws Exception;

	Status updateStatus(Long processId, Status status) throws NotFoundException;

	Process updateProcess(Long processId, Process process) throws NotFoundException;

}
