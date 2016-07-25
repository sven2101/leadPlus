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

package dash.processmanagement.domain;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.StatusNotFoundException;

public enum Status {
	OPEN("open"), OFFER("offer"), FOLLOWUP("followup"), SALE("sale"), CLOSED("closed");

	private String status;

	Status(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return status;
	}

	public static Status getStatus(String value) throws StatusNotFoundException {
		if (null == value)
			throw new StatusNotFoundException("No Status found.");
		switch (value) {
		case "open":
			return Status.OPEN;
		case "offer":
			return Status.OFFER;
		case "followup":
			return Status.FOLLOWUP;
		case "sale":
			return Status.SALE;
		case "closed":
			return Status.CLOSED;
		default:
			throw new StatusNotFoundException("No Status found.");
		}
	}

	@JsonValue
	public String getStatus() {
		return status;
	}
}
