package dash.turnovermanagement.business;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;
import dash.salemanagement.domain.Sale;
import dash.statisticmanagement.result.domain.Result;
import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class TurnoverStatisticService implements ITurnoverStatisticService {

    @Autowired
    private YearComparator 				yC;
    
    @Autowired
    private YearMonthComparator 			ymC; 
    
    @Autowired
    private YearMonthDayComparator 			ymdC; 
        
    @Autowired
    private RequestRepository<Sale, Long> 		repository;
        
    public <T> Result getDailyTurnoverStatistic(){

	Calendar until = Calendar.getInstance();
	until.add(Calendar.DAY_OF_MONTH, 1);
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales = repository.findByTimestampBetween(tmp, until);
	
	Map<String, Double> countOfSaleInDate 	= new LinkedHashMap<>();

	countOfSaleInDate.put(until.get(Calendar.DAY_OF_MONTH)+"", 0.00);
	
	double value = 0.0;
	for(Sale sale: sales){
	    value += sale.getSaleReturn();
	}	   

	countOfSaleInDate.put(until.get(Calendar.DAY_OF_MONTH)+"", value);
	
	return new Result(new ArrayList<Double>(countOfSaleInDate.values()));
    }
        
    public <T> Result getWeeklyTurnoverStatistic(){
	
	Calendar until = Calendar.getInstance();
	until.add(Calendar.DAY_OF_MONTH, 1);

	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.DAY_OF_YEAR, -6);

	final List<Sale> sales 		= repository.findByTimestampBetween(tmp, until);
	
	Map<String, Double> countOfSaleInDate 	= new LinkedHashMap<>();
   
	while(ymdC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.DAY_OF_YEAR)+"", 0.00);
	    tmp.add(Calendar.DAY_OF_YEAR, 1);
	}
	
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.DAY_OF_YEAR)+"";
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleReturn();
		countOfSaleInDate.put(key, value);	
	    }
	}	   

	return new Result(new ArrayList<Double>(countOfSaleInDate.values()));
    }
    
    public <T> Result getMonthlyTurnoverStatistic(){
	
	Calendar until = Calendar.getInstance();
	until.add(Calendar.DAY_OF_MONTH, 1);

	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.DAY_OF_MONTH, -30);
	
	final List<Sale> sales 		= repository.findByTimestampBetween(tmp, until);
	
	Map<String, Double> countOfSaleInDate 	= new LinkedHashMap<>();
	
	while(ymdC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.DAY_OF_MONTH)+"", 0.00);
	    tmp.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.DAY_OF_MONTH)+"";
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleReturn();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new Result(new ArrayList<Double>(countOfSaleInDate.values()));
    }
    
    public <T> Result getYearlyTurnoverStatistic(){
	
	Calendar until = Calendar.getInstance();
	until.add(Calendar.DAY_OF_MONTH, 1);

	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.YEAR, -1);
	
	final List<Sale> sales 		= repository.findByTimestampBetween(tmp, until);
	
	Map<String, Double> countOfSaleInDate 	= new LinkedHashMap<>();
	
	while(ymC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+""+tmp.get(Calendar.MONTH), 0.00);
	    tmp.add(Calendar.MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleReturn();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new Result(new ArrayList<Double>(countOfSaleInDate.values()));
    }
    
    public <T> Result getAllTurnoverStatistic(){
	
	Calendar until = Calendar.getInstance();
	until.add(Calendar.DAY_OF_MONTH, 1);

	Calendar tmp = Calendar.getInstance();
	tmp.set(2014, 1, 1);
	
	final List<Sale> sales 		= repository.findByTimestampBetween(tmp, until);
	
	Map<String, Double> countOfSaleInDate 	= new LinkedHashMap<>();
   
	while(yC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+"", 0.00);
	    tmp.add(Calendar.YEAR, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+"";
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleReturn();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new Result(new ArrayList<Double>(countOfSaleInDate.values()));
    }
}
