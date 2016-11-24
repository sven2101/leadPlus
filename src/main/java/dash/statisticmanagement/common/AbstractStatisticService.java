package dash.statisticmanagement.common;

import java.util.List;
import java.util.Map;

import javax.persistence.metamodel.SingularAttribute;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import dash.common.AbstractWorkflow;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Process_;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.domain.StatisticHelper;
import dash.workflowmanagement.domain.Workflow;

public abstract class AbstractStatisticService implements IStatisticService {
	private static final Logger logger = Logger.getLogger(AbstractStatisticService.class);

	@Autowired
	protected IProcessService processService;

	public final static String ALL_STATISTIC_KEY = "ALL";

	@Override
	public Map<String, List<Double>> getStatisticByDateRange(Workflow workflow, DateRange dateRange, Long elementId) {
		if (workflow == null || dateRange == null) {
			IllegalArgumentException ex = new IllegalArgumentException(
					"Workflow parameter or daterange parmeter is null");
			logger.error("Statistic cannot be created in " + this.getClass().getSimpleName() + " because of "
					+ ex.getMessage(), ex);
			throw ex;
		}
		StatisticHelper statisticHelper = new StatisticHelper(dateRange);
		final Map<String, Double> calendarMap = statisticHelper.getCalendarMap();
		final List<Process> processes = processService.getProcessesBetweenTimestamp(statisticHelper.getFrom(),
				statisticHelper.getUntil(), getAttributeByWorkflow(workflow));
		return buildStatistic(calendarMap, processes, elementId, statisticHelper, workflow);
	}

	@Override
	public abstract Map<String, List<Double>> buildStatistic(Map<String, Double> calendarMap, List<Process> processes,
			Long elementId, StatisticHelper statisticHelper, Workflow workflow);

	protected SingularAttribute<Process, AbstractWorkflow> getAttributeByWorkflow(Workflow workflow) {
		switch (workflow) {
		case LEAD:
			return Process_.lead;
		case OFFER:
			return Process_.offer;
		case SALE:
			return Process_.sale;
		default:
			return null;
		}
	}

	protected AbstractWorkflow getWorkflowUnitByWorkflow(Workflow workflow, Process process) {
		switch (workflow) {
		case LEAD:
			return process.getLead();
		case OFFER:
			return process.getOffer();
		case SALE:
			return process.getSale();
		default:
			return null;
		}
	}

}
