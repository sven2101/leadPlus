package dash.processmanagement;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dash.processmanagement.comment.Comment;
import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.status.Status;
import dash.usermanagement.User;

@Entity
public class Process {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "lead_fk", nullable = true)
    private Lead lead;
    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "offer_fk", nullable = true)
    private Offer offer;
    
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "sale_fk", nullable = true)
    private Sale sale;
    
    @OneToMany(mappedBy="process")
    @JsonIgnore
    private List<Comment> comments;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @OneToOne
    @JoinColumn(name = "processor_fk", nullable = true)
    private User processor;
    
    public Process(){
	
    }

    public Process(Lead lead){
	this.lead 	= lead;
	this.offer 	= null;
	this.sale 	= null;
	this.comments 	= null;
	this.status 	= Status.OPEN;
	this.processor 	= null;
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

    public void addComment(Comment comment) {
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
