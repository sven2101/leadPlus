package dash.processmanagement.statistic.domain;

import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by Andreas on 08.03.2016.
 */
public class Statistic {

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    private Calendar from;
    
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    private Calendar until;

    public Statistic (){}
    
    public Statistic (Calendar from, Calendar until){
	this.from = from;
	this.until = until;
    }

    public Calendar getFrom() {
	return from;
    }

    public void setFrom(Calendar from) {
	this.from = from;
    } 
    
    public Calendar getUntil() {
	return until;
    }

    public void setUntil(Calendar until) {
	this.until = until;
    }    
}
