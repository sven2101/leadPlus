package dash.inquirermanagement;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 * Created by Andreas on 10.10.2015.
 */
@Entity
public class Inquirer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstname;
    private String lastname;
    private String company;
    private String email;

    public Inquirer(){}

    public Inquirer(String firstname, String lastname, String company, String email){
        this.firstname = firstname;
        this.lastname = lastname;
        this.company = company;
        this.email = email;
    }

    public Long getId() { return id; }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
