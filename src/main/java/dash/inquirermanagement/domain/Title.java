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

package dash.inquirermanagement.domain;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.TitleNotFoundException;

public enum Title {

	UNKNOWN(""), MR("Herr"), MS("Frau");

	private String title;

	Title(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return title;
	}

	public static Title getTitle(String value) throws TitleNotFoundException {
		if (null == value)
			return Title.UNKNOWN;

		switch (value) {
		case "":
			return Title.UNKNOWN;
		case "Herr":
			return Title.MR;
		case "Frau":
			return Title.MS;
		default:
			throw new TitleNotFoundException("No Title found.");
		}
	}

	@JsonValue
	public String getTitle() {
		return title;
	}
}
