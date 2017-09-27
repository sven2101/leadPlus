package dash.statisticmanagement.olap.business;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dash.common.ByteSearializer;
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

	private static final Logger logger = Logger.getLogger(OlapStatisticService.class);

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
		try {
			saveStatisticInOLAP(DateRange.DAILY);
			saveStatisticInOLAP(DateRange.WEEKLY);
			saveStatisticInOLAP(DateRange.MONTHLY);
			saveStatisticInOLAP(DateRange.YEARLY);
			saveStatisticInOLAP(DateRange.ALL);
		} catch (IOException ex) {
			logger.error("Something went wrong when serialzing olap data.", ex);
			logger.warn("Deleting old olap data. Maybe invalid bytestream in olap.");
			deleteOldData(0);
		}
		deleteOldData(-1);
	}

	public void deleteOldData(int pastHours) {
		Calendar timestamp = Calendar.getInstance();
		timestamp.add(Calendar.HOUR_OF_DAY, pastHours);
		olapRepository.deleteByTimestampBefore(timestamp);
	}

	private void saveStatisticInOLAP(DateRange dateRange) throws IOException {
		Olap olap = new Olap();
		olap.setDateRange(dateRange);
		olap.setTimestamp(Calendar.getInstance());
		Map<String, List<Double>> profit = profitStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange,
				null);
		olap.setProfit(ByteSearializer.serialize(profit));
		Map<String, List<Double>> turnover = turnoverStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange,
				null);
		olap.setTurnover(ByteSearializer.serialize(turnover));
		Map<String, List<Double>> leads = workflowStatisticService.getStatisticByDateRange(Workflow.LEAD, dateRange,
				null);
		olap.setLeads(ByteSearializer.serialize(leads));
		Map<String, List<Double>> offers = workflowStatisticService.getStatisticByDateRange(Workflow.OFFER, dateRange,
				null);
		olap.setOffers(ByteSearializer.serialize(offers));
		Map<String, List<Double>> sales = workflowStatisticService.getStatisticByDateRange(Workflow.SALE, dateRange,
				null);
		olap.setSales(ByteSearializer.serialize(sales));

		Map<String, List<ProductStatistic>> productsLead = productStatisticService.getTopProductStatstic(Workflow.LEAD,
				dateRange, null);
		Map<String, List<ProductStatistic>> productsOffer = productStatisticService
				.getTopProductStatstic(Workflow.OFFER, dateRange, null);
		Map<String, List<ProductStatistic>> productsSale = productStatisticService.getTopProductStatstic(Workflow.SALE,
				dateRange, null);

		Map<Workflow, Map<String, List<ProductStatistic>>> products = new HashMap<>();

		products.put(Workflow.LEAD, productsLead);
		products.put(Workflow.OFFER, productsOffer);
		products.put(Workflow.SALE, productsSale);

		olap.setProducts(ByteSearializer.serialize(products));
		Map<String, List<UserStatistic>> users = userStatisticService.getTopSalesMen(dateRange);
		olap.setUsers(ByteSearializer.serialize(users));
		olapRepository.save(olap);
	}

	public Olap getLastOlapByDateRange(DateRange dateRange) {
		Olap olap = olapRepository.findTopByDateRangeOrderByTimestampDesc(dateRange);
		return olap;
	}
}
