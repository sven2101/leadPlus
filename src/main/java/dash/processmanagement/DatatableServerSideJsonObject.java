package dash.processmanagement;

import dash.processmanagement.lead.Lead;

import java.util.List;

/**
 * Created by Sven on 20.04.2016.
 */

class DatatableServerSideJsonObject {

    private int draw;
    private long recordsTotal;
    private long recordsFiltered;
    private List<?> data;

    public DatatableServerSideJsonObject(int draw, long recordsTotal, long recordsFiltered, List<?> data) {
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;

    }

    public int getDraw() {
        return draw;
    }

    public void setDraw(int draw) {
        this.draw = draw;
    }

    public long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<?> data) {
        this.data = data;
    }
}

