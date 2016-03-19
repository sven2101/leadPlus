package dash.processmanagement.lead;

import dash.processmanagement.lead.container.Container;
import dash.processmanagement.lead.inquirer.Inquirer;
import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.status.Status;

import java.util.Date;

import javax.persistence.*;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long 	id;
    
    @OneToOne
    @JoinColumn(name = "inquirer_fk")
    private Inquirer 	inquirer;
    
    @OneToOne
    @JoinColumn(name = "vendor_fk")
    private Vendor 	vendor;

    @OneToOne
    @JoinColumn(name = "container_fk")
    private Container 	container;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable=true)
    private Date 	timestamp;
    
    private int 	containerAmount;
    private String 	destination;
    
    @Column(length=2048)
    private String 	message;
    
    public Lead(){}

    public Lead(Inquirer inquirer, Vendor vendor, Container container, int containerAmount, String destination, String message, Status status, Date timestamp){
        this.inquirer 		= inquirer;
        this.vendor 		= vendor;
        this.container		= container;
        this.containerAmount 	= containerAmount;
        this.destination 	= destination;
        this.message 		= message;
	this.timestamp 		= timestamp;
    }

    public Long getId() { return id; }

    public Inquirer getInquirer() {
        return inquirer;
    }

    public void setInquirer(Inquirer inquirer) {
        this.inquirer = inquirer;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public int getContainerAmount() {
        return containerAmount;
    }

    public void setContainerAmount(int containerAmount) {
        this.containerAmount = containerAmount;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Container getContainer(){
    	return this.container;
    }
    
    public void setContainer(Container container){
    	this.container = container;
    }
   
    public Date getTimestamp(){
    	return this.timestamp;
    }
    
    public void setTimestamp(Date timestamp){
    	this.timestamp = timestamp;
    }
}
