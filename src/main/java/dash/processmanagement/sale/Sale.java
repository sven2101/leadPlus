package dash.processmanagement.sale;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import dash.processmanagement.sale.customer.Customer;

/**
 * Created by Andreas on 08.03.2016.
 */
@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long 	id;
    
    @OneToOne
    @JoinColumn(name = "customer_fk", nullable=true)
    private Customer	customer;
    
    private int 	containerAmount;
    private String 	transport;
    private double 	saleReturn;
    private double 	saleProfit;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Date 	timestamp;
    
    public Sale (){
    	
    }
    
    public Sale (int containerAmount, String transport, double saleReturn, double saleProfit, Date timestamp){
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

    public String getTransport() {
	return transport;
    }

    public void setTransport(String transport) {
	this.transport = transport;
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

    public Date getTimestamp() {
	return timestamp;
    }

    public void setTimestamp(Date timestamp) {
	this.timestamp = timestamp;
    }
    
    public Customer getCustomer() {
   	return customer;
    }

    public void setCustomer(Customer customer) {
   	this.customer = customer;
    }
}
