package dash.statisticmanagement.olap.business;

import java.util.Calendar;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.domain.DateRange;
import dash.statisticmanagement.olap.domain.Olap;
import dash.statisticmanagement.product.business.ProductStatistic;
import dash.statisticmanagement.product.business.ProductStatisticService;
import dash.statisticmanagement.profit.business.ProfitStatisticService;
import dash.statisticmanagement.turnover.business.TurnoverStatisticService;
import dash.statisticmanagement.user.business.UserStatistic;
import dash.statisticmanagement.user.business.UserStatisticService;
import dash.statisticmanagement.workflow.business.WorkflowStatisticService;
import dash.workflowmanagement.domain.Workflow;

@Service
public class OlapStatisticService {

	@Autowired
	private OlapRepository olapRepository;

	@Autowired
	private TurnoverStatisticService turnoverStatisticService;

	@Autowired
	private ProfitStatisticService profitStatisticService;

	@Autowired
	private WorkflowStatisticService workflowStatisticService;

	@Autowired
	private ProductStatisticService productStatisticService;

	@Autowired
	private UserStatisticService userStatisticService;

	@Transactional
	public void generateOlapStatistics() throws NotFoundException {
		Calendar timestamp = Calendar.getInstance();
		timestamp.add(Calendar.HOUR_OF_DAY, -1);
		saveStatisticInOLAP(DateRange.DAILY);
		saveStatisticInOLAP(DateRange.WEEKLY);
		saveStatisticInOLAP(DateRange.MONTHLY);
		saveStatisticInOLAP(DateRange.YEARLY);
		saveStatisticInOLAP(DateRange.ALL);
		olapRepository.deleteByTimestampBefore(timestamp);
	}

	private void saveStatisticInOLAP(DateRange dateRange) throws NotFoundException {
		Olap olap = new Olap();
		olap.setDateRange(dateRange);
		olap.setTimeStamp(Calendar.getInstance());
		List<Double> profit = profitStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setProfit(profit.toArray(new Double[profit.size()]));
		List<Double> turnover = turnoverStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setTurnover(turnover.toArray(new Double[turnover.size()]));
		List<Double> leads = workflowStatisticService.getStatisticByDateRange(Workflow.LEAD, dateRange, null)
				.getResult();
		olap.setLeads(leads.toArray(new Double[leads.size()]));
		List<Double> offers = workflowStatisticService.getStatisticByDateRange(Workflow.OFFER, dateRange, null)
				.getResult();
		olap.setOffers(offers.toArray(new Double[offers.size()]));
		List<Double> sales = workflowStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange, null)
				.getResult();
		olap.setSales(sales.toArray(new Double[sales.size()]));
		List<ProductStatistic> products = productStatisticService.getTopProductStatstic(Workflow.SALE, dateRange, null);
		olap.setProducts(products.toArray(new ProductStatistic[products.size()]));
		List<UserStatistic> users = userStatisticService.getTopSalesMen(dateRange);
		olap.setUsers(users.toArray(new UserStatistic[users.size()]));
		olapRepository.save(olap);
	}
}
