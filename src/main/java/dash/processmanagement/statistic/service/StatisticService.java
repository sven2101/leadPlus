package dash.processmanagement.statistic.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.sale.Sale;
import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private YearComparator yC;
    
    @Autowired
    private YearMonthComparator ymC; 
    
    @Autowired
    private YearMonthDayComparator ymdC; 
    
    /*
     * Lead, Offer Sale Statistics for a Day, Week, Month or Year
     * (non-Javadoc)
     * @see dash.processmanagement.statistic.service.IStatisticService#getDailyStatistic(dash.processmanagement.request.RequestRepository)
     */
    @SuppressWarnings("unchecked")
    public <T> List<Integer> getDailyStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(ymdC.compare(from, until) <= 0){
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
    public <T> List<Integer> getWeeklyStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -8);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(ymdC.compare(from, until) <= 0){
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
    public <T> List<Integer> getMonthlyStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.MONTH, -1);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(ymC.compare(from, until) <= 0){
	    countOfProcessInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH), 0);
	    from.add(Calendar.MONTH, 1);
	}
	for(Request request: requests){
	    Calendar timeStamp = request.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH);
	    if(countOfProcessInDate.containsKey(key)){
		int value = countOfProcessInDate.get(key)+1;
		countOfProcessInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Integer>(countOfProcessInDate.values());
    }
    
    @SuppressWarnings("unchecked")
    public <T> List<Integer> getYearlyStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.YEAR, -1);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(yC.compare(from, until) <= 0){
	    countOfProcessInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH), 0);
	    from.add(Calendar.MONTH, 1);
	}
	for(Request request: requests){
	    Calendar timeStamp = request.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH);
	    if(countOfProcessInDate.containsKey(key)){
		int value = countOfProcessInDate.get(key)+1;
		countOfProcessInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Integer>(countOfProcessInDate.values());
    }
    
    @SuppressWarnings("unchecked")
    public <T> List<Integer> getAllStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.YEAR, -1);
	
	final List<Request> requests 	= (List<Request>) repository.findByTimestampBetween(tmp, until);
	
        Map<String, Integer> countOfProcessInDate = new LinkedHashMap<>();
    
	while(yC.compare(from, until) <= 0){
	    countOfProcessInDate.put(from.get(Calendar.YEAR)+""+from.get(Calendar.MONTH), 0);
	    from.add(Calendar.MONTH, 1);
	}
	for(Request request: requests){
	    Calendar timeStamp = request.getTimestamp();
	    String key = timeStamp.get(Calendar.YEAR)+""+timeStamp.get(Calendar.MONTH);
	    if(countOfProcessInDate.containsKey(key)){
		int value = countOfProcessInDate.get(key)+1;
		countOfProcessInDate.put(key, value);
	    }
	}	   

	return new ArrayList<Integer>(countOfProcessInDate.values());
    }
    
    /*
     * Profit Statistic for a Day, Week, Month, Year
     * (non-Javadoc)
     * @see dash.processmanagement.statistic.service.IStatisticService#getProfitStatistic(dash.processmanagement.statistic.Statistic, dash.processmanagement.request.RequestRepository)
     */
    
    @SuppressWarnings("unchecked")
    public <T> List<Double> getProfitStatistic(RequestRepository<T, Long> repository){
	
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	final YearMonthDayComparator c 	= new YearMonthDayComparator();
	
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
    
    /*
     * Return Statistic
     */
    @SuppressWarnings("unchecked")
    public <T> List<Double> getReturnStatistic(RequestRepository<T, Long> repository){
	Calendar from 	= Calendar.getInstance();
	Calendar until 	= Calendar.getInstance();
	
	Calendar tmp = Calendar.getInstance();
	tmp.setTime(from.getTime());
	tmp.add(Calendar.DAY_OF_MONTH, -1);
	
	final List<Sale> sales 		= (List<Sale>) repository.findByTimestampBetween(tmp, until);
	final YearMonthDayComparator c 	= new YearMonthDayComparator();
	
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
