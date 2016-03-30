package dash.processmanagement.sale;

import java.util.Calendar;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.processmanagement.lead.container.Container;
import dash.processmanagement.request.Request;
import dash.processmanagement.sale.customer.Customer;

/**
 * Created by Andreas on 08.03.2016.
 */
@Entity
public class Sale implements Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "customer_fk", nullable = true)
    private Customer customer;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "container_fk")
    private Container container;

    private int containerAmount;
    private String transport;
    private double saleReturn;
    private double saleProfit;

    @Column(nullable=true,columnDefinition = "timestamptz")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private Calendar timestamp;

    public Sale() {

    }

    public Sale(int containerAmount, String transport, Container container, double saleReturn, double saleProfit, Calendar timestamp) {
        this.containerAmount = containerAmount;
        this.transport = transport;
        this.container = container;
        this.saleReturn = saleReturn;
        this.saleProfit = saleProfit;
        this.timestamp = timestamp;
    }

    public long getId() {
        return this.id;
    }

    public int getContainerAmount() {
        return containerAmount;
    }

    public void setContainerAmount(int containerAmount) {
        this.containerAmount = containerAmount;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public double getSaleReturn() {
        return saleReturn;
    }

    public void setSaleReturn(double saleReturn) {
        this.saleReturn = saleReturn;
    }

    public double getSaleProfit() {
        return saleProfit;
    }

    public void setSaleProfit(double saleProfit) {
        this.saleProfit = saleProfit;
    }

    public Calendar getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Calendar timestamp) {
        this.timestamp = timestamp;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Container getContainer() {
        return this.container;
    }

    public void setContainer(Container container) {
        this.container = container;
    }
}
