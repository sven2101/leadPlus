package dash.usermanagement.settings.language;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.LanguageNotFoundException;

public enum Language {

    DE("de"),
    EN("en");
	    
    private String language;

    Language (String language) {
	this.language = language;
    }

    @Override
    public String toString() {
	return language;
    }
	    
    public static Language getLanguage(String value) throws LanguageNotFoundException {
		
	switch(value){ 
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
