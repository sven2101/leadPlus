package dash;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import dash.statisticmanagement.olap.business.OlapStatisticService;

@Component
public class ScheduledTasks {

	@Autowired
	private OlapStatisticService olapStatisticService;

	@Transactional
	@Scheduled(fixedRate = 300000)
	public void generateStatistics() {
		/*
		 * try { System.out.println("start generating...");
		 * olapStatisticService.generateOlapStatistics();
		 * System.out.println("Generated..."); } catch (NotFoundException e) {
		 * System.out.println("Do nothing..."); }
		 */
	}
}