package dash.applicationmanagement;

import com.fasterxml.jackson.annotation.*;
import dash.Status;
import dash.inquirermanagement.Inquirer;
import dash.vendormanagement.Vendor;

import javax.persistence.*;

import java.io.Serializable;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class Application implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @JsonProperty(value = "inquirer")
    @JsonView
    @OneToOne(cascade = CascadeType.ALL)
   // @JoinColumn(name = "inquirer")
    public Inquirer inquirer;

    @JsonProperty(value = "vendor")
    @JsonView
    @OneToOne(cascade = CascadeType.ALL)
   // @JoinColumn(name = "vendor")
    public Vendor vendor;

    public int containerAmount;
    public boolean transport;
    public String destination;
    public String compareableProposal;
    public String message;
    public Status status;

    protected Application(){}

    public Application(Inquirer inquirer, Vendor vendor, int containerAmount, boolean transport, String destination, String compareableProposal, String message, Status status){
        this.inquirer = inquirer;
        this.vendor = vendor;
        this.containerAmount = containerAmount;
        this.transport = transport;
        this.destination = destination;
        this.compareableProposal = compareableProposal;
        this.message = message;
        this.status = status;
    }

    public Long getId() { return id; }

    public Inquirer getInquirer() {
        return inquirer;
    }

    public void setInquirer(Inquirer inquirer) {
        this.inquirer = inquirer;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public int getContainerAmount() {
        return containerAmount;
    }

    public void setContainerAmount(int containerAmount) {
        this.containerAmount = containerAmount;
    }

    public boolean isTransport() {
        return transport;
    }

    public void setTransport(boolean transport) {
        this.transport = transport;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCompareableProposal() {
        return compareableProposal;
    }

    public void setCompareableProposal(String compareableProposal) {
        this.compareableProposal = compareableProposal;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

}
