package dash.processmanagement.lead;

import com.fasterxml.jackson.annotation.*;

import dash.processmanagement.lead.container.Container;
import dash.processmanagement.lead.inquirer.Inquirer;
import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.status.Status;

import javax.persistence.*;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long 	id;
    
    @JsonProperty(value = "inquirer")
    @JsonView
    @OneToOne
    @JoinColumn(name = "inquirer_fk")
    private Inquirer 	inquirer;
    
    @JsonProperty(value = "vendor")
    @JsonView
    @OneToOne
    @JoinColumn(name = "vendor_fk")
    private Vendor 	vendor;

    @JsonProperty(value = "container")
    @JsonView
    @OneToOne
    @JoinColumn(name = "container_fk")
    private Container 	container;

    private String 	date;
    
    private int 	containerAmount;
    private String 	destination;
    
    @Column(length=2048)
    private String 	message;
    
    public Lead(){}

    public Lead(Inquirer inquirer, Vendor vendor, Container container, int containerAmount, String destination, String message, Status status, String date){
        this.inquirer 		= inquirer;
        this.vendor 		= vendor;
        this.container		= container;
        this.containerAmount 	= containerAmount;
        this.destination 	= destination;
        this.message 		= message;
	this.date 		= date;
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
   
    public String getDate(){
    	return this.date;
    }
    
    public void setDate(String date){
    	this.date = date;
    }
}
