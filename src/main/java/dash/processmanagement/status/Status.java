package dash.processmanagement.status;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * Created by Andreas on 16.11.2015.
 */
public enum Status {
    OPEN("open"),
    OFFER("offer"),
    SALE("sale"),
    CLOSED("closed");
    
    private String status;

    Status (String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }
    
    @JsonCreator
    public static Status create (String value) {

        return OPEN;/*
        if(value == null) {
            throw new IllegalArgumentException();
        }
        for(Status v : values()) {
            if(value.equals(v.getStatus())) {
                return v;
            }
        }
        throw new IllegalArgumentException();
        */
    }
    
    public String getStatus() {
        return status;
    }
}
