package dash.processmanagement.status;

import com.fasterxml.jackson.annotation.JsonValue;

import dash.exceptions.StatusNotFoundException;

/**
 * Created by Andreas on 16.11.2015.
 */
public enum Status {
    OPEN("open"),
    OFFER("offer"),
    SALE("sale"),
    CLOSED("closed");

    private String status;

    Status(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }

    public static Status getStatus(String value) throws StatusNotFoundException {
        if (null == value)
            throw new StatusNotFoundException("No Status found.");
        switch (value) {
            case "open":
                return Status.OPEN;
            case "offer":
                return Status.OFFER;
            case "sale":
                return Status.SALE;
            case "closed":
                return Status.CLOSED;
            default:
                throw new StatusNotFoundException("No Status found.");
        }
    }

    @JsonValue
    public String getStatus() {
        return status;
    }
}
