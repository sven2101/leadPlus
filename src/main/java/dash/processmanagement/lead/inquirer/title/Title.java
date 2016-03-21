package dash.processmanagement.lead.inquirer.title;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.TitleNotFoundException;

public enum Title {

    MR("Herr"),
    MS("Frau");
    
    private String title;

    Title (String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return title;
    }
    
    public static Title getTitle(String value) throws TitleNotFoundException {
	
	 switch(value){ 
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
