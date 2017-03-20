package dash.productmanagement.domain;

public enum ProductState {
	NEW("Neu", "New"), USED_A("Gebraucht A", "Used A"), USED_B("Gebraucht B", "Used B"), USED_C("Gebraucht C",
			"Used C"), USED_D("Gebraucht D", "Used D");

	private String germanTranslation;

	private String englishTranslation;

	private ProductState(String germanTranslation, String englishTranslation) {
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
