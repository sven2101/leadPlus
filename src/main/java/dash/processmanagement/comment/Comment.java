package dash.processmanagement.comment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import dash.processmanagement.Process;
import dash.usermanagement.User;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long 	id;
	
	@ManyToOne
	@JoinColumn(name = "process_fk", nullable = false, insertable = false, updatable = false)
	private Process process;
	
	@ManyToOne
	@JoinColumn(name = "user_fk", nullable = false, insertable = false, updatable = false)
	private User 	user;
	
	private String 	commentText;
	private Date 	timestamp;
	
	public Comment(){
		
	}
	
	public Comment(Process process, User user, String commentText, Date timestamp){
	    	this.process 		= process;
	    	this.user 		= user;
		this.commentText 	= commentText;
		this.timestamp 		= timestamp;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Process getProcess() {
		return process;
	}
	public void setProcess(Process process) {
		this.process = process;
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
		return timestamp;
	}
	public void setDate(Date timestamp) {
		this.timestamp = timestamp;
	}
}
