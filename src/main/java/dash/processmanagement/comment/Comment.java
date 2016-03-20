package dash.processmanagement.comment;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import dash.usermanagement.User;

import dash.processmanagement.Process;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long 		id;
		
	@ManyToOne
	@JoinColumn(name = "user_fk", nullable = false, insertable = false, updatable = false)
	private User 		user;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="process_fk")
	private Process 	process;
	
	private String 		commentText;
	
	@Column(nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar 	timestamp;
	
	public Comment(){
		
	}
	
	public Comment(Process process, User user, String commentText, Calendar timestamp){
	    this.process	= process;
	    this.user 		= user;
	    this.commentText 	= commentText;
	    this.timestamp 	= timestamp;
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
	
	public Calendar getDate() {
		return timestamp;
	}
	public void setDate(Calendar timestamp) {
		this.timestamp = timestamp;
	}
}
