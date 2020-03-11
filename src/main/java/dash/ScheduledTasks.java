package dash;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import dash.multitenancy.configuration.TenantContext;
import dash.statisticmanagement.olap.business.OlapStatisticService;
import dash.tenantmanagement.business.ITenantService;
import dash.tenantmanagement.domain.Tenant;

@Component
public class ScheduledTasks {

	private static final int THREAD_MIN = 2;

	private static final Logger logger = Logger.getLogger(ScheduledTasks.class);

	@Autowired
	private OlapStatisticService olapStatisticService;

	@Autowired
	private ITenantService tenantService;

	@Scheduled(cron = "0 0 5-20/3 * * MON-FRI")
	private void generateStatisticsSchedulerMoToFr() {
		logger.info("Do cronejob for MON-FRI");
		generateStatistics();
	}

	@Scheduled(cron = "0 0 6-20/12 * * SAT,SUN")
	// @Scheduled(cron = "0 0/1 5-23 * * SAT,SUN")
	private void generateStatisticsSchedulerSatToSun() {
		logger.info("Do cronejob for SAT,SUN");
		generateStatistics();
	}

	public void generateStatistics() {
		try {
			ThreadPoolTaskExecutor pool = new ThreadPoolTaskExecutor();
			TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
			List<Tenant> tenants = tenantService.getAllTenants();
			int threadAmount = THREAD_MIN;
			if (tenants.size() >= 30)
				threadAmount = tenants.size() / 5;
			pool.setCorePoolSize(threadAmount);
			pool.setWaitForTasksToCompleteOnShutdown(true);
			pool.initialize();

			for (Tenant tenant : tenants) {
				if (tenant == null || tenant.getTenantKey() == null)
					continue;
				String tenantKey = tenant.getTenantKey();
				pool.execute(new Runnable() {
					@Override
					public void run() {
						TenantContext.setTenant(tenantKey);
						try {
							// logger.info("Generate Statistics for " +
							// tenantKey);
							olapStatisticService.generateOlapStatistics();
							// logger.info("Statistics generated for " +
							// tenantKey);
						} catch (Exception ex) {
							logger.error("Something went wrong when trying to generate olap statistics for " + tenantKey
									+ " | " + ex.getMessage(), ex);
						}
					}
				});
			}
			pool.shutdown();
		} catch (Exception ex) {
			logger.error("Something went wrong when trying to generate olap statistics", ex);
			logger.warn("Deleting old olap data. Maybe invalid bytestream in olap.");
			olapStatisticService.deleteOldData(0);
		}
	}

}