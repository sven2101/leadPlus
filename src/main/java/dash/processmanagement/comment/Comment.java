package dash.processmanagement.comment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import dash.processmanagement.lead.Lead;
import dash.usermanagement.User;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "lead_fk", nullable = false, insertable = false, updatable = false)
	private Lead lead;
	
	@ManyToOne
	@JoinColumn(name = "user_fk", nullable = false, insertable = false, updatable = false)
	private User user;
	
	private String commentText;
	private Date date;
	
	public Comment(){
		
	}
	
	public Comment(String commentText, Date date){
		this.commentText = commentText;
		this.date = date;
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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
}
