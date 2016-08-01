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

package dash.containermanagement.business;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import dash.containermanagement.domain.Container;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;

@Service
@Transactional
public interface IContainerService {

	public List<Container> getAll();

	public Container getById(final Long id) throws NotFoundException;

	public Container save(final Container container) throws SaveFailedException;

	public Container update(final Container container) throws UpdateFailedException;

	public void delete(final Long id) throws DeleteFailedException;

}
