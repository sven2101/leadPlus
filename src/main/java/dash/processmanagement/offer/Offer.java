package dash.processmanagement.offer;

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

import dash.processmanagement.offer.prospect.Prospect;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @OneToOne
    @JoinColumn(name = "prospect_fk", nullable=true)
    private Prospect 	prospect;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Date	timestamp;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Date 	deliveryDate;
    
    private double 	price;
    private String 	deliveryAddress;
    
    public Offer(){
	
    }
    
    public Offer(Prospect prospect, Date timestamp, double price, Date deliveryDate, String deliveryAddress){
	this.prospect 		= prospect;
	this.timestamp 		= timestamp;
	this.price 		= price;
	this.deliveryDate 	= deliveryDate;
	this.deliveryAddress 	= deliveryAddress;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Prospect getProspect() {
        return prospect;
    }

    public void setProspect(Prospect prospect) {
        this.prospect = prospect;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
    
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    
    
}
