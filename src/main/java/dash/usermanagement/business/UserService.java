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
import static dash.Constants.UPDATE_FAILED_EXCEPTION;
import static dash.Constants.USER_NOT_FOUND;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dash.common.Encryptor;
import dash.consistencymanagement.business.ConsistencyService;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.DontMatchException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.RegisterFailedException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.fileuploadmanagement.business.IFileUploadService;
import dash.messagemanagement.business.MessageService;
import dash.messagemanagement.domain.AbstractMessage;
import dash.multitenancy.configuration.TenantContext;
import dash.notificationmanagement.business.AWSEmailService;
import dash.security.jwt.JwtTokenFactory;
import dash.security.jwt.domain.JwtToken;
import dash.security.jwt.domain.UserContext;
import dash.smtpmanagement.business.ISmtpService;
import dash.smtpmanagement.business.SmtpUtil;
import dash.smtpmanagement.domain.Smtp;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.registration.domain.Registration;
import dash.usermanagement.registration.domain.Validation;
import dash.usermanagement.settings.language.Language;
import dash.usermanagement.settings.password.PasswordChange;

@Service
public class UserService extends ConsistencyService {

	private static final Logger logger = Logger.getLogger(UserService.class);

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private IFileUploadService fileUploadService;
	private ISmtpService smtpService;
	private MessageService messageService;
	private AWSEmailService awsEmailService;
	@Autowired
	private JwtTokenFactory tokenFactory;

	@Autowired
	public UserService(IFileUploadService fileUploadService, ISmtpService smtpService, PasswordEncoder passwordEncoder,
			UserRepository userRepository, MessageService messageService, AWSEmailService awsEmailService) {
		this.fileUploadService = fileUploadService;
		this.smtpService = smtpService;
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.messageService = messageService;
		this.awsEmailService = awsEmailService;
	}

	public List<User> getAll() {
		return userRepository.findAll().stream().filter(it -> !"superadmin@eviarc.com".equals(it.getUsername()))
				.collect(Collectors.toList());
	}

	public User getById(final long id) throws NotFoundException {
		if (Optional.ofNullable(id).isPresent()) {
			return userRepository.findOne(id);
		} else {
			NotFoundException cnfex = new NotFoundException(USER_NOT_FOUND);
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public User getUserByEmail(final String email) throws NotFoundException {
		if (email != null) {
			return userRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
		} else {
			NotFoundException cnfex = new NotFoundException(USER_NOT_FOUND);
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	public User checkEmailExists(final String email) {
		if (email != null) {
			return userRepository.findByEmailIgnoreCase(email).orElse(null);
		}
		return null;
	}

	public User save(final User user)
			throws SaveFailedException, NotFoundException, IllegalArgumentException, ConsistencyFailedException {
		if (user == null) {
			logger.error(USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
			throw new IllegalArgumentException(
					USER_NOT_FOUND + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL);
		}
		this.checkConsistencyAndSetTimestamp(user, userRepository);
		return userRepository.save(user);
	}

	public User update(final User user)
			throws UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException, ConsistencyFailedException {
		if (user != null) {
			try {
				User updateUser = getById(user.getId());
				if (updateUser != null) {
					User validateUser = getUserByEmail(user.getEmail());
					if (user.getEmail() != null) {
						if (validateUser != null && updateUser.getId() != validateUser.getId()) {
							throw new EmailAlreadyExistsException(EMAIL_EXISTS);
						}

						updateUser.setEmail(user.getEmail());
					}
					updateUser.setLanguage(user.getLanguage());
					updateUser.setFirstname(user.getFirstname());
					updateUser.setLastname(user.getLastname());
					updateUser.setPhone(user.getPhone());
					updateUser.setSkype(user.getSkype());
					updateUser.setMobile(user.getMobile());
					updateUser.setFax(user.getFax());
					updateUser.setJob(user.getJob());
					updateUser.setDefaultVat(user.getDefaultVat());
					updateUser.setDefaultBCC(user.getDefaultBCC());
					updateUser.setDefaultCC(user.getDefaultCC());
					return save(updateUser);

				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (IllegalArgumentException | NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
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

	public User updateProfilPicture(final User user) throws UpdateFailedException, ConsistencyFailedException {
		if (Optional.ofNullable(user).isPresent()) {
			try {
				User updateUser = getById(user.getId());
				if (Optional.ofNullable(updateUser).isPresent()) {
					updateUser.setProfilPicture(user.getPicture());
					updateUser.setThumbnail(user.getThumbnail());
					return save(updateUser);
				} else {
					throw new NotFoundException(USER_NOT_FOUND);
				}
			} catch (IllegalArgumentException | NotFoundException | SaveFailedException ex) {
				logger.error(ex.getMessage() + UserService.class.getSimpleName(), ex);
				throw new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			}
		} else {
			UpdateFailedException ufex = new UpdateFailedException(UPDATE_FAILED_EXCEPTION);
			logger.error(UPDATE_FAILED_EXCEPTION + UserService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, ufex);
			throw ufex;
		}
	}

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

	public Map<String, String> updatePassword(final long id, final PasswordChange passwordChange) throws Exception {
		if (Optional.ofNullable(id).isPresent() && Optional.ofNullable(passwordChange).isPresent()) {
			try {
				User user = getById(id);
				if (user != null && passwordChange.getOldPassword() != null
						&& passwordChange.getNewPassword() != null) {
					if (passwordEncoder.matches(passwordChange.getOldPassword(), user.getPassword())) {
						user.setPassword(passwordEncoder.encode(passwordChange.getNewPassword()));
						Smtp smtp = null;
						smtp = smtpService.findByUserId(user.getId());
						String newSmtpKey = null;
						if (smtp != null) {

							smtp.setPassword(SmtpUtil.decryptPasswordForSmtp(smtp).getBytes());
							newSmtpKey = Encryptor.hashTextPBKDF2(passwordChange.getNewPassword(), user.getEmail(),
									300);
							smtp.setDecrypted(true);
							smtpService.save(smtp, newSmtpKey);

						}
						save(user);
						Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
						UserContext userContext = (UserContext) authentication.getPrincipal();

						JwtToken accessToken = tokenFactory.createAccessJwtToken(userContext, TenantContext.getTenant(),
								newSmtpKey);
						JwtToken refreshToken = tokenFactory.createRefreshToken(userContext, TenantContext.getTenant(),
								newSmtpKey);

						Map<String, String> tokenMap = new HashMap<String, String>();
						tokenMap.put("token", accessToken.getToken());
						tokenMap.put("refreshToken", refreshToken.getToken());
						return tokenMap;
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

	public void resetPassword(final Long id, final String newPassword) throws SaveFailedException, NotFoundException, IllegalArgumentException, ConsistencyFailedException {
		User user = getById(id);
		if (user == null)
			throw new NotFoundException(USER_NOT_FOUND);

		user.setPassword(passwordEncoder.encode(newPassword));
		save(user);

		try {
			Smtp smtp = this.smtpService.findByUserId(id);
			smtp.setPassword(null);
			this.smtpService.save(smtp, null);
		} catch (Exception ex) {
			logger.error("User didn't specify a SMTP-Server - " + UserService.class.getSimpleName(), ex);
			ex.printStackTrace();
		}
	}

	public User activate(final long id, final boolean enabled) throws UpdateFailedException, IllegalArgumentException, ConsistencyFailedException {
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

	public User setRoleForUser(final Long id, final Role role) throws UpdateFailedException, IllegalArgumentException, ConsistencyFailedException {
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

	public User register(final Registration registration) throws EmailAlreadyExistsException, RegisterFailedException, NotFoundException, IllegalArgumentException, ConsistencyFailedException {

		if (registration != null && registration.getEmail() != null && registration.getPassword() != null) {

			try {
				if (emailAlreadyExists(registration.getEmail()).isValidation()) {
					throw new EmailAlreadyExistsException(EMAIL_EXISTS);
				}

				Role role = Role.USER;
				boolean enabled = false;
				if (this.getAll().isEmpty()) {
					role = Role.SUPERADMIN;
					enabled = true;
				}

				final User user = new User();
				user.setEmail(registration.getEmail());
				user.setFirstname(registration.getFirstname());
				user.setLastname(registration.getLastname());
				user.setPassword(passwordEncoder.encode(registration.getPassword()));
				user.setRole(role);
				user.setEnabled(enabled);
				user.setLanguage(registration.getLanguage());
				user.setDefaultVat(19.00);
				notify(user);
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
		final Validation validation = new Validation();
		validation.setValidation(false);
		if (checkEmailExists(email) != null)
			validation.setValidation(true);
		return validation;
	}

	public User setProfilePicture(long id, MultipartFile file) throws NotFoundException, SaveFailedException,
			UpdateFailedException, UsernameAlreadyExistsException, EmailAlreadyExistsException, ConsistencyFailedException {
		User user = getById(id);
		user.setProfilPicture(fileUploadService.save(file));
		return update(user);
	}

	public Optional<User> loadUserByEmail(String email) {
		return userRepository.findByEmailIgnoreCase(email);
	}

	public void notify(User user) {
		String tenant = TenantContext.getTenant();

		String templateName = "welcome_en.ftl";
		if (user.getLanguage().equals(Language.DE))
			templateName = "welcome_de.ftl";

		AbstractMessage welcomeMessage;
		try {
			welcomeMessage = this.messageService.getWelcomeMessage(templateName, tenant, user);
			this.awsEmailService.sendMail("andreas.foitzik@leadplus.io", welcomeMessage.getRecipients(),
					welcomeMessage.getSubject(), welcomeMessage.getContent());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
