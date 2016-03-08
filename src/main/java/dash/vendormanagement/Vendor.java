package dash.vendormanagement;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by Andreas on 10.10.2015.
 */

@Entity
public class Vendor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;

    public Vendor(){}

    public Vendor(String name, String phone){
        this.name = name;
        this.phone = phone;
    }

    public Long getId() { return id; }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
