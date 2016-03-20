package dash.processmanagement.offer;

import java.util.Calendar;

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
import dash.processmanagement.request.Request;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Offer implements Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @OneToOne
    @JoinColumn(name = "prospect_fk", nullable=true)
    private Prospect 	prospect;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Calendar	timestamp;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Calendar 	deliveryDate;
    
    private double 	price;
    private String 	deliveryAddress;
    
    public Offer(){
	
    }
    
    public Offer(Prospect prospect, Calendar timestamp, double price, Calendar deliveryDate, String deliveryAddress){
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

    public Calendar getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Calendar timestamp) {
        this.timestamp = timestamp;
    }
    
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Calendar getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Calendar deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    
    
}
