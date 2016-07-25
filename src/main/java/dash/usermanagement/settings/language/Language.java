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

package dash.usermanagement.settings.language;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.LanguageNotFoundException;

public enum Language {

	DE("de"), EN("en");

	private String language;

	Language(String language) {
		this.language = language;
	}

	@Override
	public String toString() {
		return language;
	}

	public static Language getLanguage(String value) throws LanguageNotFoundException {

		switch (value) {
		case "de":
			return Language.DE;
		case "en":
			return Language.EN;
		default:
			throw new LanguageNotFoundException("No Language found.");
		}
	}

	@JsonValue
	public String getStatus() {
		return language;
	}
}
