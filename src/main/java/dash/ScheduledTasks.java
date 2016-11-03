package dash;

import java.util.List;
import org.apache.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.olap.business.OlapStatisticService;
import dash.tenantmanagement.business.ITenantService;
import dash.tenantmanagement.business.TenantContext;
import dash.tenantmanagement.domain.Tenant;

@Component
public class ScheduledTasks {

	private static final int THREAD_MIN = 5;

	private static final Logger logger = Logger.getLogger(ScheduledTasks.class);

	@Autowired
	private OlapStatisticService olapStatisticService;

	@Autowired
	private ITenantService tenantService;

	@Scheduled(fixedRate = 300000)
	public void generateStatistics() {

		ThreadPoolTaskExecutor pool = new ThreadPoolTaskExecutor();
		TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
		List<Tenant> tenants = tenantService.getAllTenants();
		int threadAmount = THREAD_MIN;
		if (tenants.size() >= 30)
			threadAmount = tenants.size() / 5;
		pool.setCorePoolSize(threadAmount);
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
						System.out.println("Generate Statistic in Olap for: " + tenantKey);
						olapStatisticService.generateOlapStatistics();
						System.out.println("Statistics generated!");
					} catch (NotFoundException ex) {
						logger.error("Something went wrong when trying to generate olap statistics for" + tenantKey,
								ex);
					}
				}
			});
		}
	}
}