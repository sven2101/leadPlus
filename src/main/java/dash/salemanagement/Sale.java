package dash.salemanagement;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import dash.leadmanagement.Lead;

/**
 * Created by Andreas on 08.03.2016.
 */
@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
            
    private int containerAmount;
    private Boolean containerTransport;
    private double saleReturn;
    private double saleProfit;
    private Date saleDate;

    @OneToOne
    private Lead lead;
    
    public Sale (){
    	
    }

	public int getContainerAmount() {
		return containerAmount;
	}

	public void setContainerAmount(int containerAmount) {
		this.containerAmount = containerAmount;
	}

	public Boolean getContainerTransport() {
		return containerTransport;
	}

	public void setContainerTransport(Boolean containerTransport) {
		this.containerTransport = containerTransport;
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

	public Date getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Date saleDate) {
		this.saleDate = saleDate;
	}
    
    
    
}
