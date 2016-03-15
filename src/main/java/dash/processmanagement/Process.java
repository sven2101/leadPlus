package dash.processmanagement;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import dash.processmanagement.commentmanagement.Comment;
import dash.processmanagement.leadmanagement.Lead;
import dash.processmanagement.offermanagement.Offer;
import dash.processmanagement.salemanagement.Sale;
import dash.processmanagement.status.Status;
import dash.usermanagement.User;

@Entity
public class Process {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "lead_fk")
    private Lead lead;
    
    @OneToOne
    @JoinColumn(name = "offer_fk")
    private Offer offer;
    
    @OneToOne
    @JoinColumn(name = "sale_fk")
    private Sale sale;
    
    @OneToMany
    @JoinColumn(name = "comment_fk", nullable = false)
    private List<Comment> comments;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @OneToOne
    @JoinColumn(name = "processor_fk")
    private User processor;
    
    public Process(){
	
    }
    
    public Process(Lead lead, Offer offer, Sale sale, List<Comment> comments, Status status, User processor){
	this.lead 	= lead;
	this.offer 	= offer;
	this.sale 	= sale;
	this.comments 	= comments;
	this.status 	= status;
	this.processor 	= processor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Lead getLead() {
        return lead;
    }

    public void setLead(Lead lead) {
        this.lead = lead;
    }

    public Offer getOffer() {
        return offer;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public List<Comment> getComments() {
        return comments;
    } 

    public void setComment(Comment comment) {
   	this.comments.add(comment);
    }
    
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
    
    public User getProcessor() {
        return processor;
    }

    public void setProcessor(User processor) {
        this.processor = processor;
    }
}
