package dash.processmanagement.statistic.conversion.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface IConversionStatisticService {
    
    public <T> List<Double> 	getDailyConversionStatistic(); 
    public <T> List<Double> 	getWeeklyConversionStatistic();
    public <T> List<Double> 	getMonthlyConversionStatistic();
    public <T> List<Double> 	getYearlyConversionStatistic();
    public <T> List<Double> 	getAllConversionStatistic();
}
