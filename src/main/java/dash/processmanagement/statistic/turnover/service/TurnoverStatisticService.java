package dash.processmanagement.statistic.turnover.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class TurnoverStatisticService implements ITurnoverStatisticService {

    @Autowired
    private YearComparator 			yC;
    
    @Autowired
    private YearMonthComparator 		ymC; 
    
    @Autowired
    private YearMonthDayComparator 		ymdC; 
        
    @Autowired
    private RequestRepository<Sale, Long> 	repository;
    
    private Calendar until 	= Calendar.getInstance();
    
    public <T> List<Double> getDailyTurnoverStatistic(){
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(ymdC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+""+tmp.get(Calendar.MONTH)+""+tmp.get(Calendar.DAY_OF_MONTH), 0.00);
	    tmp.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH)+""+timeStamp.get(Calendar.DAY_OF_MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleProfit();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }
        
    public <T> List<Double> getWeeklyTurnoverStatistic(){
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.DAY_OF_MONTH, -8);

	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(ymdC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+""+tmp.get(Calendar.MONTH)+""+tmp.get(Calendar.DAY_OF_MONTH), 0.00);
	    tmp.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH)+""+timeStamp.get(Calendar.DAY_OF_MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleProfit();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }
    
    public <T> List<Double> getMonthlyTurnoverStatistic(){
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.MONTH, -2);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(ymC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+""+tmp.get(Calendar.MONTH), 0.00);
	    tmp.add(Calendar.MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleProfit();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }
    
    public <T> List<Double> getYearlyTurnoverStatistic(){
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.YEAR, -2);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(yC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+"", 0.00);
	    tmp.add(Calendar.YEAR, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+"";
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleProfit();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }
    
    public <T> List<Double> getAllTurnoverStatistic(){
	
	Calendar tmp = Calendar.getInstance();
	tmp.add(Calendar.YEAR, -2);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(yC.compare(tmp, until) <= 0){
	    countOfSaleInDate.put(tmp.get(Calendar.YEAR)+""+tmp.get(Calendar.MONTH)+""+tmp.get(Calendar.DAY_OF_MONTH), 0.00);
	    tmp.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH)+""+timeStamp.get(Calendar.DAY_OF_MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key) + sale.getSaleProfit();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }
}
