package dash.statisticmanagement.conversion.business;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface IConversionStatisticService {
    
    <T> List<Double> 	getDailyConversionStatistic();
    <T> List<Double> 	getWeeklyConversionStatistic();
    <T> List<Double> 	getMonthlyConversionStatistic();
    <T> List<Double> 	getYearlyConversionStatistic();
    <T> List<Double> 	getAllConversionStatistic();
}
