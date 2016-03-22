package dash.processmanagement.statistic.profit.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface IProfitStatisticService {
    
    public <T> List<Double> 	getDailyProfitStatistic(); 
    public <T> List<Double> 	getWeeklyProfitStatistic();
    public <T> List<Double> 	getMonthlyProfitStatistic();
    public <T> List<Double> 	getYearlyProfitStatistic();
    public <T> List<Double> 	getAllProfitStatistic();
}
