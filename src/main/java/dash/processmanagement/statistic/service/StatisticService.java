package dash.processmanagement.statistic.service;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.lead.LeadRepository;
import dash.processmanagement.statistic.Statistic;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private LeadRepository leadRepository;
        
    public List<Integer> getLeadStatistic(Statistic statistic){
	final List<Lead> leads 		= leadRepository.findByTimestampBetween(statistic.getFrom(), statistic.getUntil());
	final List<Integer> values 	= new ArrayList<Integer>();
	
	final DateTime dtUntil 		= new DateTime(statistic.getUntil());

	DateTime dtFrom 		= new DateTime(statistic.getFrom());

	while (!dtFrom.isEqual(dtUntil)){
	    int value = 0; 
	    for(Lead lead: leads){
		final DateTime dtCurrent = new DateTime(lead.getTimestamp());
		if (dtFrom.isEqual(dtCurrent)){
		    value ++;
		}
	    }
	    
	    values.add(value);
	    dtFrom = dtFrom.plusDays(1);
	}	
	
	return values;
    }
    
    public List<Integer> getOfferStatistic(Statistic statistic){
	return null;
    }
    
    public List<Integer> getSaleStatistic(Statistic statistic){
	return null;
    }
    
    public List<Double> getConversionStatistic(Statistic statistic){
	return null;
    } 
    
    public List<Double> getProfitStatistic(Statistic statistic){
	return null;
    }
    
    public List<Double> getTurnoverStatistic(Statistic statistic){
	return null;
    }
}
