package dash.processmanagement.containermanagement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Andreas on 10.10.2015.
 */
@Entity
public class Container {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private double priceNetto;

    public Container(){}

    public Container(String name, String description, double priceNetto){
        this.name = name;
        this.description = description;
        this.priceNetto = priceNetto;
    }

    public Long getId () {return id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPriceNetto() {
        return priceNetto;
    }

    public void setPriceNetto(double priceNetto) {
        this.priceNetto = priceNetto;
    }
}
