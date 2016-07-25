package dash.statisticmanagement.business;

import org.springframework.stereotype.Service;

import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.result.domain.Result;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public interface IStatisticService {

    <T> Result 	getDailyStatistic(RequestRepository<T, Long> leadRepository);
    <T> Result 	getWeeklyStatistic(RequestRepository<T, Long> leadRepository);
    <T> Result 	getMonthlyStatistic(RequestRepository<T, Long> leadRepository);
    <T> Result 	getYearlyStatistic(RequestRepository<T, Long> leadRepository);
    <T> Result 	getAllStatistic(RequestRepository<T, Long> leadRepository);
}
