package dash.processmanagement.statistic;

import java.util.Date;

/**
 * Created by Andreas on 08.03.2016.
 */
public class Statistic {

    private Date from;
    private Date until;

    public Statistic (){}
    
    public Statistic (Date from, Date until){
	this.from = from;
	this.until = until;
    }

    public Date getFrom() {
	return from;
    }

    public void setFrom(Date from) {
	this.from = from;
    } 
    
    public Date getUntil() {
	return until;
    }

    public void setUntil(Date until) {
	this.until = until;
    }    
}
