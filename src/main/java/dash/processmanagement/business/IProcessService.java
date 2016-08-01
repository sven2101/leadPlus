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
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.processmanagement.domain.Workflow;
import dash.processmanagement.request.Request;
import dash.salemanagement.domain.Sale;
import dash.usermanagement.domain.User;

@Service
public interface IProcessService {

	public List<Request> getElementsByStatus(Status status, Workflow workflow);

	public Process getById(final Long id) throws NotFoundException;

	public Iterable<Process> getAll();

	public void saveProcesses(List<Process> processes) throws SaveFailedException;

	public Process save(final Process process) throws SaveFailedException;

	public Process update(final Process process) throws UpdateFailedException;

	public Lead createLead(Long processId, final Lead lead) throws SaveFailedException;

	public Offer createOffer(Long processId, final Offer offer) throws SaveFailedException;

	public Sale createSale(Long processId, final Sale sale) throws SaveFailedException;

	public User setProcessor(Long processId, String username) throws Exception;

	public Status updateStatus(Long processId, Status status) throws UpdateFailedException;

	public List<Process> getProcessWithLatestSales(final int amount);

}
