package dash.processmanagement.statistic.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.statistic.Statistic;
import dash.utils.TimeIgnoringComparator;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class StatisticService implements IStatisticService {

    @SuppressWarnings("unchecked")
    public <T> List<Integer> getStatistic(Statistic statistic, RequestRepository<T, Long> repository){
	
	Calendar from 	= statistic.getFrom();
	Calendar until = statistic.getUntil();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	final TimeIgnoringComparator c 	= new TimeIgnoringComparator();
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(c.compare(from, until) <= 0){
	    countOfProcessInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH)+""+from.get(Calendar.DAY_OF_MONTH), 0);
	    from.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Request request: requests){
	    Calendar timeStamp = request.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH)+""+timeStamp.get(Calendar.DAY_OF_MONTH);
	    if(countOfProcessInDate.containsKey(key)){
		int value = countOfProcessInDate.get(key)+1;
		countOfProcessInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Integer>(countOfProcessInDate.values());
    }
    
    @SuppressWarnings("unchecked")
    public <T> List<Double> getProfitStatistic(Statistic statistic, RequestRepository<T, Long> repository){
	
	Calendar from 	= statistic.getFrom();
	Calendar until 	= statistic.getUntil();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	final TimeIgnoringComparator c 	= new TimeIgnoringComparator();
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(c.compare(from, until) <= 0){
	    countOfSaleInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH)+""+from.get(Calendar.DAY_OF_MONTH), 0.00);
	    from.add(Calendar.DAY_OF_MONTH, 1);
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
    
    @SuppressWarnings("unchecked")
    public <T> List<Double> getReturnStatistic(Statistic statistic, RequestRepository<T, Long> repository){
	Calendar from 	= statistic.getFrom();
	Calendar until 	= statistic.getUntil();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	final TimeIgnoringComparator c 	= new TimeIgnoringComparator();
	
        Map<String, Double> countOfSaleInDate = new LinkedHashMap<>();
    
	while(c.compare(from, until) <= 0){
	    countOfSaleInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH)+""+from.get(Calendar.DAY_OF_MONTH), 0.00);
	    from.add(Calendar.DAY_OF_MONTH, 1);
	}
	for(Sale sale: sales){
	    Calendar timeStamp = sale.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH)+""+timeStamp.get(Calendar.DAY_OF_MONTH);
	    if(countOfSaleInDate.containsKey(key)){
		double value = countOfSaleInDate.get(key)+sale.getSaleReturn();
		countOfSaleInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Double>(countOfSaleInDate.values());
    }

}
