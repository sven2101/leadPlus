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

import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.domain.Process;
import dash.salemanagement.domain.Sale;
import dash.statusmanagement.domain.Status;
import dash.usermanagement.domain.User;
import dash.workflowmanagement.domain.Workflow;
		
@Service
public interface IProcessService {

	public List<Process> getElementsByStatus(final Workflow workflow, final Status status);

	public Process getById(final long id) throws NotFoundException;

	public Iterable<Process> getAll();

	public void saveProcesses(final List<Process> processes) throws SaveFailedException;

	public Process save(final Process process) throws SaveFailedException;

	public Process update(final Process process) throws UpdateFailedException;

	public void delete(final long processId) throws DeleteFailedException;

	public Lead createLead(final long processId, final Lead lead) throws SaveFailedException;

	public Offer createOffer(final long processId, final Offer offer) throws SaveFailedException;

	public Sale createSale(final long processId, final Sale sale) throws SaveFailedException;

	public User setProcessor(final long processId, final long userId) throws Exception;

	public List<Process> getProcessWithLatestSales(final int amount);

	public Process removeProcessorByProcessId(final long processId) throws UpdateFailedException;

}
