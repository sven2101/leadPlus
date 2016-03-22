package dash.processmanagement.statistic.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public interface IStatisticService {

    public <T> List<Integer> 	getDailyStatistic(RequestRepository<T, Long> leadRepository); 
    public <T> List<Integer> 	getWeeklyStatistic(RequestRepository<T, Long> leadRepository);
    public <T> List<Integer> 	getMonthlyStatistic(RequestRepository<T, Long> leadRepository);
    public <T> List<Integer> 	getYearlyStatistic(RequestRepository<T, Long> leadRepository);
    public <T> List<Integer> 	getAllStatistic(RequestRepository<T, Long> leadRepository);
    
    public <T> List<Double> 	getProfitStatistic(RequestRepository<T, Long> leadRepository); 
    public <T> List<Double> 	getReturnStatistic(RequestRepository<T, Long> leadRepository); 
}
