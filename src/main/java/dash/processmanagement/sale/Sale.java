package dash.processmanagement.sale;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Andreas on 08.03.2016.
 */
@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private int 	containerAmount;
    private boolean 	transport;
    private double 	saleReturn;
    private double 	saleProfit;
    private String 	timestamp;
    
    public Sale (){
    	
    }
    
    public Sale (int containerAmount, boolean transport, double saleReturn, double saleProfit, String timestamp){
    	this.containerAmount 	= containerAmount;
    	this.transport		= transport;
    	this.saleReturn		= saleReturn;
    	this.saleProfit		= saleProfit;
    	this.timestamp		= timestamp;
    }

    public int getContainerAmount() {
	return containerAmount;
    }

    public void setContainerAmount(int containerAmount) {
	this.containerAmount = containerAmount;
    }

    public Boolean getContainerTransport() {
	return transport;
    }

    public void setContainerTransport(Boolean containerTransport) {
	this.transport = containerTransport;
    }

    public double getSaleReturn() {
	return saleReturn;
    }

    public void setSaleReturn(double saleReturn) {
	this.saleReturn = saleReturn;
    }

    public double getSaleProfit() {
	return saleProfit;
    }

    public void setSaleProfit(double saleProfit) {
	this.saleProfit = saleProfit;
    }

    public String getTimestamp() {
	return timestamp;
    }

    public void setTimestamp(String timestamp) {
	this.timestamp = timestamp;
    }
}
