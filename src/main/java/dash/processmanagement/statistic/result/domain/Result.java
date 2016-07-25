package dash.processmanagement.statistic.result.domain;

import java.util.List;

public class Result {

    private List<Double> result; 
    
    public Result (){}
    
    public Result(List <Double> result){
	this.result = result;
    }

    public List <Double> getResult() {
        return result;
    }

    public void setResult(List <Double> result) {
        this.result = result;
    }
    
    

}
