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
import dash.exceptions.SaveFailedException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.processmanagement.domain.Workflow;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.domain.User;

@Service
public interface IProcessService {

	public List<Object> getElementsByStatus(Status status, Workflow workflow);

	public void createProcesses(List<Process> processes) throws SaveFailedException;

	public Process createProcess(final Process process) throws SaveFailedException;

	public Lead createLead(Long processId, Lead lead) throws NotFoundException;

	public Offer createOffer(Long processId, Offer offer) throws NotFoundException;

	public Sale createSale(Long processId, Sale sale) throws NotFoundException;

	public User createProcessor(Long processId, String username) throws Exception;

	public Status updateStatus(Long processId, Status status) throws NotFoundException;

	public Process updateProcess(final Process process) throws NotFoundException;

	public List<Process> getProcessWithLatestSales(final int amount);

}
