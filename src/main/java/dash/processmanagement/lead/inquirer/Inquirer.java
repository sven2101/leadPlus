package dash.processmanagement.lead.inquirer;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import dash.processmanagement.lead.inquirer.title.Title;

/**
 * Created by Andreas on 10.10.2015.
 */
@Entity
public class Inquirer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    private Title  title;
    
    private String firstname;
    private String lastname;
    private String company;
    private String email;
    private String phone;

    public Inquirer(){}

    public Inquirer(Title title, String firstname, String lastname, String company, String email, String phone){
        this.title = title;
    	this.firstname = firstname;
        this.lastname = lastname;
        this.company = company;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() { return id; }

    public Title getTitle() {
        return title;
    }

    public void setTitle(Title title) { this.title = title; }
    
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
    
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
