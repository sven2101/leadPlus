package dash.processmanagement.statistic.turnover.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.result.domain.Result;

@Service
public interface ITurnoverStatisticService {
    
    <T> Result 	getDailyTurnoverStatistic();
    <T> Result 	getWeeklyTurnoverStatistic();
    <T> Result 	getMonthlyTurnoverStatistic();
    <T> Result 	getYearlyTurnoverStatistic();
    <T> Result 	getAllTurnoverStatistic();
}
