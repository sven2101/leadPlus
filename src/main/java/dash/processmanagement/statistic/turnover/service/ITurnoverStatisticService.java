package dash.processmanagement.statistic.turnover.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.result.Result;

@Service
public interface ITurnoverStatisticService {
    
    <T> Result 	getDailyTurnoverStatistic();
    <T> Result 	getWeeklyTurnoverStatistic();
    <T> Result 	getMonthlyTurnoverStatistic();
    <T> Result 	getYearlyTurnoverStatistic();
    <T> Result 	getAllTurnoverStatistic();
}
