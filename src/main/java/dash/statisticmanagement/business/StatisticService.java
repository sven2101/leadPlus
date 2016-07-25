package dash.statisticmanagement.business;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.result.domain.Result;
import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

/**
 * Created by Andreas on 08.03.2016.
 */
@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private YearComparator yC;

    @Autowired
    private YearMonthComparator ymC;

    @Autowired
    private YearMonthDayComparator ymdC;

    @SuppressWarnings("unchecked")
    public <T> Result getDailyStatistic(RequestRepository<T, Long> repository) {

        Calendar from = Calendar.getInstance();
        from.add(Calendar.DAY_OF_MONTH, -1);

        Calendar until = Calendar.getInstance();
        until.add(Calendar.DAY_OF_MONTH, 1);

        final List<Request> requests = (List<Request>) repository.findByTimestampBetween(from, until);

        Map<String, Double> countOfProcessInDate = new LinkedHashMap<>();

        countOfProcessInDate.put(until.get(Calendar.DAY_OF_MONTH) + "", (double) requests.size());

        return new Result(new ArrayList<Double>(countOfProcessInDate.values()));
    }

    @SuppressWarnings("unchecked")
    public <T> Result getWeeklyStatistic(RequestRepository<T, Long> repository) {

        Calendar until = Calendar.getInstance();
        until.add(Calendar.DAY_OF_MONTH, 1);

        Calendar tmp = Calendar.getInstance();
        tmp.add(Calendar.DAY_OF_YEAR, -6);

        final List<Request> requests = (List<Request>) repository.findByTimestampBetween(tmp, until);

        Map<String, Double> countOfProcessInDate = new LinkedHashMap<>();

        while (ymdC.compare(tmp, until) <= 0) {
            countOfProcessInDate.put(tmp.get(Calendar.DAY_OF_MONTH) + "", 0.00);
            tmp.add(Calendar.DAY_OF_MONTH, 1);
        }

        for (Request request : requests) {
            Calendar timeStamp = request.getTimestamp();
            String key = timeStamp.get(Calendar.DAY_OF_MONTH) + "";
            if (countOfProcessInDate.containsKey(key)) {
                double value = countOfProcessInDate.get(key) + 1.00;
                countOfProcessInDate.put(key, value);
            }
        }
        return new Result(new ArrayList<Double>(countOfProcessInDate.values()));
    }

    @SuppressWarnings("unchecked")
    public <T> Result getMonthlyStatistic(RequestRepository<T, Long> repository) {

        Calendar until = Calendar.getInstance();
        until.add(Calendar.DAY_OF_MONTH, 1);

        Calendar tmp = Calendar.getInstance();
        tmp.add(Calendar.DAY_OF_MONTH, -30);

        final List<Request> requests = (List<Request>) repository.findByTimestampBetween(tmp, until);

        Map<String, Double> countOfProcessInDate = new LinkedHashMap<>();

        while (ymdC.compare(tmp, until) <= 0) {
            countOfProcessInDate.put(tmp.get(Calendar.DAY_OF_MONTH) + "", 0.00);
            tmp.add(Calendar.DAY_OF_MONTH, 1);
        }

        for (Request request : requests) {
            Calendar timeStamp = request.getTimestamp();
            String key = timeStamp.get(Calendar.DAY_OF_MONTH) + "";
            if (countOfProcessInDate.containsKey(key)) {
                double value = countOfProcessInDate.get(key) + 1.00;
                countOfProcessInDate.put(key, value);
            }
        }

        return new Result(new ArrayList<Double>(countOfProcessInDate.values()));
    }

    @SuppressWarnings("unchecked")
    public <T> Result getYearlyStatistic(RequestRepository<T, Long> repository) {

        Calendar until = Calendar.getInstance();
        until.add(Calendar.DAY_OF_MONTH, 1);

        Calendar tmp = Calendar.getInstance();
        tmp.add(Calendar.YEAR, -1);

        final List<Request> requests = (List<Request>) repository.findByTimestampBetween(tmp, until);

        Map<String, Double> countOfProcessInDate = new LinkedHashMap<>();

        while (ymC.compare(tmp, until) <= 0) {
            countOfProcessInDate.put(tmp.get(Calendar.YEAR) + "" + tmp.get(Calendar.MONTH), 0.00);
            tmp.add(Calendar.MONTH, 1);
        }
        for (Request request : requests) {
            Calendar timeStamp = request.getTimestamp();
            String key = timeStamp.get(Calendar.YEAR) + "" + timeStamp.get(Calendar.MONTH);
            if (countOfProcessInDate.containsKey(key)) {
                double value = countOfProcessInDate.get(key) + 1.00;
                countOfProcessInDate.put(key, value);
            }
        }

        return new Result(new ArrayList<Double>(countOfProcessInDate.values()));
    }

    @SuppressWarnings("unchecked")
    public <T> Result getAllStatistic(RequestRepository<T, Long> repository) {

        Calendar until = Calendar.getInstance();
        until.add(Calendar.DAY_OF_MONTH, 1);

        Calendar tmp = Calendar.getInstance();
        tmp.set(2014, 1, 1);

        final List<Request> requests = (List<Request>) repository.findByTimestampBetween(tmp, until);

        Map<String, Double> countOfProcessInDate = new LinkedHashMap<>();

        while (yC.compare(tmp, until) <= 0) {
            countOfProcessInDate.put(tmp.get(Calendar.YEAR) + "", 0.00);
            tmp.add(Calendar.YEAR, 1);
        }

        for (Request request : requests) {
            Calendar timeStamp = request.getTimestamp();
            String key = timeStamp.get(Calendar.YEAR) + "";
            if (countOfProcessInDate.containsKey(key)) {
                double value = countOfProcessInDate.get(key) + 1.00;
                countOfProcessInDate.put(key, value);
            }
        }
        return new Result(new ArrayList<Double>(countOfProcessInDate.values()));
    }
}
