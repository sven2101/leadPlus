package dash.statisticmanagement.common;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.STATISTIC_NOT_FOUND;

import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import dash.exceptions.NotFoundException;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.request.Request;
import dash.processmanagement.request.RequestRepository;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.statisticmanagement.result.domain.Result;
import dash.workflowmanagement.domain.Workflow;

public abstract class AbstractStatisticService implements IStatisticService {
	private static final Logger logger = Logger.getLogger(AbstractStatisticService.class);

	@Autowired
	private RequestRepository<Lead, Long> leadRepository;

	@Autowired
	private RequestRepository<Offer, Long> offerRepository;

	@Autowired
	private RequestRepository<Offer, Long> saleRepository;

	protected StatisticHelper statisticHelper;

	@Override
	public Result getStatisticByDateRange(Workflow workflow, DateRange dateRange) throws NotFoundException {
		if (workflow == null || dateRange == null) {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}
		statisticHelper = new StatisticHelper(dateRange);
		final Map<String, Double> calendarMap = statisticHelper.getCalendarMap();
		final List<Request> requests = getStatisticBetween(getRepositoryByWorkflow(workflow), statisticHelper.getFrom(),
				statisticHelper.getUntil());
		return new Result(buildStatistic(calendarMap, requests));
	}

	public abstract List<Double> buildStatistic(Map<String, Double> calendarMap, List<Request> requests);

	@SuppressWarnings("unchecked")
	@Override
	public <T> List<Request> getStatisticBetween(RequestRepository<T, Long> repository, Calendar from, Calendar until)
			throws NotFoundException {
		if (Optional.ofNullable(repository).isPresent() && Optional.ofNullable(from).isPresent()
				&& Optional.ofNullable(until).isPresent()) {
			return (List<Request>) repository.findByTimestampBetween(from, until);
		} else {
			NotFoundException pnfex = new NotFoundException(STATISTIC_NOT_FOUND);
			logger.error(STATISTIC_NOT_FOUND + this.getClass().getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, pnfex);
			throw pnfex;
		}
	}

	@SuppressWarnings("unchecked")
	private <T> RequestRepository<T, Long> getRepositoryByWorkflow(Workflow workflow) {
		if (workflow.equals(Workflow.LEAD)) {
			return (RequestRepository<T, Long>) leadRepository;
		} else if (workflow.equals(Workflow.OFFER)) {
			return (RequestRepository<T, Long>) offerRepository;
		} else if (workflow.equals(Workflow.SALE)) {
			return (RequestRepository<T, Long>) saleRepository;
		}
		return null;
	}

}
