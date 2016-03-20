package dash.processmanagement.statistic;

import java.util.Calendar;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Created by Andreas on 08.03.2016.
 */
public class Statistic {

    @Temporal(TemporalType.TIMESTAMP)
    private Calendar from;
    
    @Temporal(TemporalType.TIMESTAMP)
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
