package dash.processmanagement.statistic;

import java.util.Date;

/**
 * Created by Andreas on 08.03.2016.
 */
public abstract class Statistic {

	private String name;
 	private Date from;
    private Date until;
    
    public Statistic (String name, Date from, Date until){
    	this.name = name;
    	this.from = from;
    	this.until = until;
    }
    
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
