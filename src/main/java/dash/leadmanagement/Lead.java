package dash.leadmanagement;

import com.fasterxml.jackson.annotation.*;
import dash.Status;
import dash.commentmanagement.Comment;
import dash.containermanagement.Container;
import dash.inquirermanagement.Inquirer;
import dash.salemanagement.Sale;
import dash.usermanagement.User;
import dash.vendormanagement.Vendor;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
@Table(indexes = { @Index(columnList = "container_fk")})
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty(value = "inquirer")
    @JsonView
    @OneToOne
    @JoinColumn(name = "inquirer_fk")
    private Inquirer inquirer;

    @JsonProperty(value = "vendor")
    @JsonView
    @OneToOne
    @JoinColumn(name = "vendor_fk")
    private Vendor vendor;

    @JsonProperty(value = "container")
    @JsonView
    @OneToOne
    @JoinColumn(name = "container_fk")
    private Container container;
    
    @OneToOne
    @JoinColumn(name = "sale_fk")
    private Sale sale;
      
    @OneToMany
    @JoinColumn(name = "lead_fk", nullable = false)
    private List<Comment> comment;

    @JsonProperty(value = "processor")
    @JsonView
    @OneToOne
    @JoinColumn(name = "processor_fk")
    private User processor;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
        
    @Enumerated(EnumType.STRING)
    private Status status;
    
    private int containerAmount;
    private String destination;
    private String message;
    
    public Lead(){}

    public Lead(Inquirer inquirer, Vendor vendor, int containerAmount, String destination, String message, Status status, Date date){
        this.inquirer = inquirer;
        this.vendor = vendor;
        this.containerAmount = containerAmount;
        this.destination = destination;
        this.message = message;
        this.status = status;
        this.date = date;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Container getContainer(){
    	return this.container;
    }
    
    public void setContainer(Container container){
    	this.container = container;
    }
    
    public Date getDate(){
    	return this.date;
    }
    
    public void setDate(Date date){
    	this.date = date;
    }
    
    public User getProcessor(){
    	return this.processor;
    }
    
    public void setProcessor(User processor){
    	this.processor = processor;
    }
}
