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

package dash.notificationmanagement.rest;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.notificationmanagement.business.INotificationService;
import dash.notificationmanagement.domain.Notification;
import dash.notificationmanagement.domain.NotificationContext;
import dash.notificationmanagement.domain.NotificationType;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.domain.Process;
import dash.smtpmanagement.business.ISmtpService;
import dash.usermanagement.business.UserService;
import dash.usermanagement.domain.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/notifications", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "Notifications API")
public class NotificationResource {

	private static final Logger logger = Logger.getLogger(NotificationResource.class);

	@Autowired
	private INotificationService notificationService;

	@Autowired
	private ISmtpService smtpService;

	@Autowired
	private IProcessService processService;

	@Autowired
	private UserService userService;

	@ApiOperation(value = "Send a single Notification.", notes = "")
	@RequestMapping(value = "/proccesses/{processId}/users/{userId}/send", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Object> sendNotification(
			@ApiParam(required = true) @PathVariable(required = true) final Long processId,
			@ApiParam(required = true) @PathVariable(required = true) final Long userId,
			@ApiParam(required = true) @RequestBody @Valid final NotificationContext notificationContext)
			throws NotFoundException, SaveFailedException {

		Notification notification = notificationContext.getNotification();
		Process process = processService.getById(processId);
		User user = userService.getById(userId);
		notification.setUser(user);

		try {
			notificationService.sendNotification(smtpService.findByUserId(userId),
					notificationContext.getNotification(), notificationContext.getSmtpKey());
		} catch (Exception e) {
			notification.setNotificationType(NotificationType.ERROR);
			logger.error(NotificationResource.class.getSimpleName() + e.getMessage(), e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

		process.getNotifications().add(notification);
		processService.save(process);

		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
