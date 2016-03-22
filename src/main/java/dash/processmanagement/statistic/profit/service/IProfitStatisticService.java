package dash.processmanagement.statistic.profit.service;

import org.springframework.stereotype.Service;

import dash.processmanagement.statistic.result.Result;

@Service
public interface IProfitStatisticService {
    
    public <T> Result 	getDailyProfitStatistic(); 
    public <T> Result 	getWeeklyProfitStatistic();
    public <T> Result 	getMonthlyProfitStatistic();
    public <T> Result 	getYearlyProfitStatistic();
    public <T> Result 	getAllProfitStatistic();
}
