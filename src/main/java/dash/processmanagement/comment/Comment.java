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

import dash.processmanagement.Process;
import dash.usermanagement.User;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "creator_fk", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "process_fk", nullable = false)
    private Process process;

    private String commentText;

    @Column(nullable = false, columnDefinition = "timestamptz")
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar timestamp;

    public Comment() {

    }

    public Comment(Process process, User creator, String commentText, Calendar timestamp) {
        this.process = process;
        this.creator = creator;
        this.commentText = commentText;
        this.timestamp = timestamp;
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
