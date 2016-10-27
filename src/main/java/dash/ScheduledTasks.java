package dash;

import java.util.List;
import java.util.concurrent.Semaphore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import dash.statisticmanagement.olap.business.OlapStatisticService;
import dash.tenantmanagement.business.ITenantService;
import dash.tenantmanagement.business.TenantContext;
import dash.tenantmanagement.domain.Tenant;

@Component
public class ScheduledTasks {

	private static final int THREAD_MIN = 5;

	@Autowired
	private OlapStatisticService olapStatisticService;

	@Autowired
	private ITenantService tenantService;

	@Scheduled(fixedRate = 300000)
	public void generateStatistics() {
		TenantContext.setTenant(TenantContext.PUBLIC_TENANT);
		List<Tenant> tenants = tenantService.getAllTenants();
		int threadAmount = THREAD_MIN;
		if (tenants.size() >= 30)
			threadAmount = tenants.size() / 5;
		Semaphore semaphore = new Semaphore(threadAmount);

		for (Tenant tenant : tenants) {
			if (tenant == null || tenant.getTenantKey() == null)
				continue;
			OlapThread olapThread = new OlapThread(semaphore, tenant.getTenantKey(), this.olapStatisticService);
			olapThread.start();
		}
	}

}