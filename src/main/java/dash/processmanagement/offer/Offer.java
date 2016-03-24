package dash.processmanagement.offer;

import java.util.Calendar;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.processmanagement.lead.container.Container;
import dash.processmanagement.lead.vendor.Vendor;
import dash.processmanagement.offer.prospect.Prospect;
import dash.processmanagement.request.Request;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Offer implements Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "prospect_fk", nullable = true)
    private Prospect prospect;

    @OneToOne
    @JoinColumn(name = "vendor_fk")
    private Vendor vendor;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "container_fk")
    private Container container;

    private int containerAmount;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy HH:mm")
    private Calendar timestamp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy HH:mm")
    private Calendar deliveryDate;

    private double price;
    private String deliveryAddress;

    public Offer() {

    }

    public Offer(Prospect prospect, Vendor vendor, Container container, int containerAmount, Calendar timestamp, double price, Calendar deliveryDate, String deliveryAddress) {
        this.prospect = prospect;
        this.vendor = vendor;
        this.container = container;
        this.containerAmount = containerAmount;
        this.timestamp = timestamp;
        this.price = price;
        this.deliveryDate = deliveryDate;
        this.deliveryAddress = deliveryAddress;
    }

    public long getId() {
        return id;
    }

    public Prospect getProspect() {
        return prospect;
    }

    public void setProspect(Prospect prospect) {
        this.prospect = prospect;
    }

    public Calendar getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Calendar timestamp) {
        this.timestamp = timestamp;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Calendar getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Calendar deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Container getContainer() {
        return this.container;
    }

    public void setContainer(Container container) {
        this.container = container;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public int getContainerAmount() {
        return this.containerAmount;
    }

    public void setContainerAmount(int containerAmount) {
        this.containerAmount = containerAmount;
    }


}
