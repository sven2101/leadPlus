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

package dash.customermanagement.domain;

public enum Title {

	UNKNOWN("Damen und Herren", "Sir or Madam"), MR("Herr", "Mr"), MS("Frau", "Ms");

	private String germanTranslation;

	private String englishTranslation;

	private Title(String germanTranslation, String englishTranslation) {
		this.germanTranslation = germanTranslation;
		this.englishTranslation = englishTranslation;
	}

	public String getGermanTranslation() {
		return germanTranslation;
	}

	public String getEnglishTranslation() {
		return englishTranslation;
	}

}
