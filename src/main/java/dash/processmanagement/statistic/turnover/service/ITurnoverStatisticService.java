package dash.processmanagement.statistic.turnover.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.result.Result;

@Service
public interface ITurnoverStatisticService {
    
    public <T> Result 	getDailyTurnoverStatistic(); 
    public <T> Result 	getWeeklyTurnoverStatistic();
    public <T> Result 	getMonthlyTurnoverStatistic();
    public <T> Result 	getYearlyTurnoverStatistic();
    public <T> Result 	getAllTurnoverStatistic();
}
