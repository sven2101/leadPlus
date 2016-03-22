package dash.processmanagement.statistic.result;

import java.util.ArrayList;
import java.util.List;

public class Result {

    private List<Double> result; 
    
    public Result (){}
    
    public Result(ArrayList<Double> result){
	this.result = result;
    }

    public List<Double> getResult() {
        return result;
    }

    public void setResult(List<Double> result) {
        this.result = result;
    }
    
    

}
