package dash.processmanagement.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dash.processmanagement.Process;
import dash.usermanagement.User;

import javax.persistence.*;
import java.util.Calendar;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long 		id;

	@ManyToOne
	@JoinColumn(name = "creator_fk", nullable = false)
	private User creator;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="process_fk", nullable = false)
	private Process 	process;
	
	private String 		commentText;
	
	@Column(nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar 	timestamp;
	
	public Comment(){
		
	}
	
	public Comment(Process process, User creator, String commentText, Calendar timestamp){
	    this.process	= process;
	    this.creator = creator;
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
	
	public User getCreator() {
		return this.creator;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
	
	public String getCommentText() {
		return this.commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	
	public Calendar getDate() {
		return this.timestamp;
	}
	public void setDate(Calendar timestamp) {
		this.timestamp = timestamp;
	}
}
