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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dash.exceptions.SMTPdoesntExistsException;
import dash.notificationmanagement.business.INotificationService;
import dash.notificationmanagement.domain.Notification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping(value = "/api/rest/notifications", produces = { MediaType.APPLICATION_JSON_VALUE }, consumes = { MediaType.APPLICATION_JSON_VALUE })
@ResponseStatus(HttpStatus.CREATED)
@Api(value = "notifications")
public class NotificationResource {

	@Autowired
	private INotificationService notificationService;

	@ApiOperation(value = "Send a single Notification.", notes = "")
	@RequestMapping(value = "/api/rest/notifications/users/{id}/offers/send", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	public void sendOffer(@ApiParam(required = true) @PathVariable final Long id,
			@ApiParam(required = true) @RequestBody @Valid final Notification notification) throws SMTPdoesntExistsException {
		notificationService.sendNotification(id, notification);
	}

}
