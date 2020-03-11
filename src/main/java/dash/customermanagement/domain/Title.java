
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
