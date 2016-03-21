package dash.processmanagement.statistic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;
import dash.processmanagement.statistic.Statistic;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public interface IStatisticService {

    public <T> List<Integer> 	getStatistic(Statistic statistic, RequestRepository<T, Long> leadRepository); 
    public <T> List<Double> 	getProfitStatistic(Statistic statistic, RequestRepository<T, Long> leadRepository); 
    public <T> List<Double> 	getReturnStatistic(Statistic statistic, RequestRepository<T, Long> leadRepository); 
}
