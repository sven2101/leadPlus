package dash.turnovermanagement.business;

import org.springframework.stereotype.Service;

import dash.statisticmanagement.result.domain.Result;

@Service
public interface ITurnoverStatisticService {
    
    <T> Result 	getDailyTurnoverStatistic();
    <T> Result 	getWeeklyTurnoverStatistic();
    <T> Result 	getMonthlyTurnoverStatistic();
    <T> Result 	getYearlyTurnoverStatistic();
    <T> Result 	getAllTurnoverStatistic();
}
