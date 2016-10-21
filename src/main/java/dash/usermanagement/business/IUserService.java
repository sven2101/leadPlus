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

package dash.usermanagement.business;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.DontMatchException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.password.PasswordChange;

@Service
public interface IUserService {

	public List<User> getAll();

	public User getById(final long id) throws NotFoundException;

	public User getUserByName(String username) throws NotFoundException;

	public User save(final User user) throws SaveFailedException;

	public User update(final User user)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException;

	public void delete(final long id) throws DeleteFailedException;

	public void updatePassword(final long id, final PasswordChange passwordChange)
			throws UpdateFailedException, DontMatchException, Exception;

	public User updateProfilPicture(final User user)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException;

	public User activate(final long id, final boolean enabled) throws UpdateFailedException;

	public User setProfilePicture(final long id, final MultipartFile file) throws NotFoundException,
			SaveFailedException, UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException;

}
