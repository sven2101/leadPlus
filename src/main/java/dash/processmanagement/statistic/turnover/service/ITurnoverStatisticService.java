package dash.processmanagement.statistic.turnover.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ITurnoverStatisticService {
    
    public <T> List<Double> 	getDailyTurnoverStatistic(); 
    public <T> List<Double> 	getWeeklyTurnoverStatistic();
    public <T> List<Double> 	getMonthlyTurnoverStatistic();
    public <T> List<Double> 	getYearlyTurnoverStatistic();
    public <T> List<Double> 	getAllTurnoverStatistic();
}
