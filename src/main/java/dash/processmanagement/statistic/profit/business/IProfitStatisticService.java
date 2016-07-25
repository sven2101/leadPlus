package dash.processmanagement.statistic.profit.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.result.domain.Result;

@Service
public interface IProfitStatisticService {
    
    <T> Result 	getDailyProfitStatistic();
    <T> Result 	getWeeklyProfitStatistic();
    <T> Result 	getMonthlyProfitStatistic();
    <T> Result 	getYearlyProfitStatistic();
    <T> Result 	getAllProfitStatistic();
}
