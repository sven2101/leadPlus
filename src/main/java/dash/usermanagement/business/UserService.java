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

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.DELETE_FAILED_EXCEPTION;
import static dash.Constants.DONT_MATCH;
import static dash.Constants.EMAIL_EXISTS;
import static dash.Constants.REGISTER_FAILED_EXCEPTION;
import static dash.Constants.SAVE_FAILED_EXCEPTION;
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.USER_EXISTS;
import static dash.Constants.USER_NOT_FOUND;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.DeleteFailedException;
import dash.exceptions.DontMatchException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.RegisterFailedException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;
import dash.usermanagement.settings.language.Language;
import dash.usermanagement.settings.password.PasswordChange;

@Service
public class UserService implements IUserService {

	private static final Logger logger = Logger.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private Validation validation;

	@Autowired
	private IFileUploadService fileUploadService;

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return userRepository.findOne(id);
		} else {
			NotFoundException cnfex = new NotFoundException(USER_NOT_FOUND);
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	@Override
	public User getUserByName(final String username) throws NotFoundException {
		if (Optional.ofNullable(username).isPresent()) {
			return userRepository.findByUsernameIgnoreCase(username);
		} else {
			NotFoundException cnfex = new NotFoundException(USER_NOT_FOUND);
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public User getUserByEmail(final String email) throws NotFoundException {
		if (Optional.ofNullable(email).isPresent()) {
			return userRepository.findByEmailIgnoreCase(email);
		} else {
			NotFoundException cnfex = new NotFoundException(USER_NOT_FOUND);
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public User checkUserNameExists(final String username) {
		if (Optional.ofNullable(username).isPresent()) {
			return userRepository.findByUsernameIgnoreCase(username);
		} else
			return null;
	}

	public User checkEmailExists(final String email) {
		if (Optional.ofNullable(email).isPresent()) {
			return userRepository.findByEmailIgnoreCase(email);
		}
		return null;
	}

	@Override
	public User save(final User user) throws SaveFailedException {
		if (Optional.ofNullable(user).isPresent()) {

			return userRepository.save(user);
		} else {
			SaveFailedException sfex = new SaveFailedException(SAVE_FAILED_EXCEPTION);
			logger.error(SAVE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, sfex);
			throw sfex;
		}
	}

	@Override
	public User update(final User user)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException {
		if (Optional.ofNullable(user).isPresent()) {
			try {
				User updateUser = getById(user.getId());
				if (Optional.ofNullable(updateUser).isPresent()) {
					if (!Optional.ofNullable(getUserByName(user.getUsername())).isPresent()) {
						updateUser.setUsername(user.getUsername());
					} else if (!user.getUsername().equals(updateUser.getUsername())) {
						throw new UsernameAlreadyExistsException(USER_EXISTS);
					}
					if (!Optional.ofNullable(getUserByEmail(user.getEmail())).isPresent()) {
						updateUser.setEmail(user.getEmail());
					} else if (!user.getUsername().equals(updateUser.getUsername())) {
						throw new EmailAlreadyExistsException(EMAIL_EXISTS);
					}
					updateUser.setLanguage(user.getLanguage());
					updateUser.setProfilPicture(user.getPicture());
					updateUser.setFirstname(user.getFirstname());
					updateUser.setLastname(user.getLastname());
					return save(updateUser);
				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (IllegalArgumentException | NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			} catch (UsernameAlreadyExistsException uaeex) {
				logger.error(USER_EXISTS + UserService.class.getSimpleName(), uaeex);
				throw uaeex;
			} catch (EmailAlreadyExistsException eaeex) {
				logger.error(EMAIL_EXISTS + UserService.class.getSimpleName(), eaeex);
				throw eaeex;
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public void delete(final long id) throws DeleteFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				userRepository.delete(id);
			} catch (EmptyResultDataAccessException erdaex) {
				logger.error(DELETE_FAILED_EXCEPTION + UserService.class.getSimpleName() + erdaex.getMessage(), erdaex);
				throw new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			}
		} else {
			DeleteFailedException dfex = new DeleteFailedException(DELETE_FAILED_EXCEPTION);
			logger.error(DELETE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, dfex);
			throw dfex;
		}

	}

	@Override
	public void updatePassword(final long id, final PasswordChange passwordChange)
			throws UpdateFailedException, DontMatchException {
		if (Optional.ofNullable(id).isPresent() && Optional.ofNullable(passwordChange).isPresent()) {
			try {
				User user = getById(id);
				if (user != null && passwordChange.getOldPassword() != null
						&& passwordChange.getNewPassword() != null) {
					if (passwordEncoder.matches(passwordChange.getOldPassword(), user.getPassword())) {
						user.setPassword(passwordEncoder.encode(passwordChange.getNewPassword()));
						save(user);
					} else {
						throw new DontMatchException(UPDATE_FAILED_EXCEPTION);
					}
				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (IllegalArgumentException | NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			} catch (DontMatchException dmex) {
				logger.error(DONT_MATCH + UserService.class.getSimpleName(), dmex);
				throw dmex;
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	@Override
	public User activate(final long id, final boolean enabled) throws UpdateFailedException {
		if (Optional.ofNullable(id).isPresent()) {
			try {
				User user = getById(id);
				if (Optional.ofNullable(user).isPresent()) {
					user.setEnabled(enabled);
					return save(user);
				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(
						UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + ex.getMessage());
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	public User setRoleForUser(final Long id, final Role role) throws UpdateFailedException {
		if (Optional.ofNullable(id).isPresent() && Optional.ofNullable(role).isPresent()) {
			try {
				User user = getById(id);
				if (Optional.ofNullable(user).isPresent()) {
					user.setRole(role);
					return save(user);
				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(
						UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + ex.getMessage());
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

	public User register(final Registration registration)
			throws UsernameAlreadyExistsException, EmailAlreadyExistsException, RegisterFailedException {
		if (Optional.ofNullable(registration).isPresent() && Optional.ofNullable(registration.getUsername()).isPresent()
				&& Optional.ofNullable(registration.getEmail()).isPresent()
				&& Optional.ofNullable(registration.getPassword()).isPresent()) {
			try {
				if (usernameAlreadyExists(registration.getUsername()).isValidation()) {
					throw new UsernameAlreadyExistsException(USER_EXISTS);
				}
				if (emailAlreadyExists(registration.getEmail()).isValidation()) {
					throw new EmailAlreadyExistsException(EMAIL_EXISTS);
				}

				final User user = new User();
				user.setUsername(registration.getUsername());
				user.setEmail(registration.getEmail());
				user.setFirstname(registration.getFirstname());
				user.setLastname(registration.getLastname());
				user.setPassword(passwordEncoder.encode(registration.getPassword()));
				user.setRole(Role.USER);
				user.setEnabled(false);
				user.setLanguage(Language.DE);

				return save(user);
			} catch (SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new RegisterFailedException(REGISTER_FAILED_EXCEPTION);
			}
		} else {
			RegisterFailedException rfex = new RegisterFailedException(REGISTER_FAILED_EXCEPTION);
			logger.error(REGISTER_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL,
					rfex);
			throw rfex;
		}
	}

	public Validation emailAlreadyExists(String email) {
		this.validation.setValidation(false);
		if (checkEmailExists(email) != null)
			this.validation.setValidation(true);
		return this.validation;
	}

	public Validation usernameAlreadyExists(String username) {
		this.validation.setValidation(false);
		if (checkUserNameExists(username) != null)
			this.validation.setValidation(true);
		return this.validation;
	}

	@Override
	public User setProfilePicture(long id, MultipartFile file) throws NotFoundException, SaveFailedException,
			UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException {
		User user = getById(id);
		user.setProfilPicture(fileUploadService.save(file));
		return update(user);
	}

}
