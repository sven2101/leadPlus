package dash.processmanagement.statistic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.Statistic;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public interface IStatisticService {

    public List<Integer> getLeadStatistic(Statistic statistic); 
    public List<Integer> getOfferStatistic(Statistic statistic); 
    public List<Integer> getSaleStatistic(Statistic statistic); 

    public List<Double>  getConversionStatistic(Statistic statistic); 
    public List<Double>  getProfitStatistic(Statistic statistic); 
    public List<Double>  getTurnoverStatistic(Statistic statistic); 
}
