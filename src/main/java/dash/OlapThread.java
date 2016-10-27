package dash;

import java.util.concurrent.Semaphore;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;

import dash.exceptions.NotFoundException;
import dash.statisticmanagement.olap.business.OlapStatisticService;
import dash.tenantmanagement.business.TenantContext;

public class OlapThread extends Thread {

	private static final Logger logger = Logger.getLogger(OlapThread.class);

	private Semaphore semaphore;
	private String tenantKey;
	private OlapStatisticService olapStatisticService;

	public OlapThread(Semaphore semaphore, String tenantKey, OlapStatisticService olapStatisticService) {
		this.semaphore = semaphore;
		this.tenantKey = tenantKey;
		this.olapStatisticService = olapStatisticService;
	}

	@Transactional
	public void run() {
		try {
			semaphore.acquire();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		TenantContext.setTenant(tenantKey);
		try {
			System.out.println("Generate Statistic in Olap for: " + tenantKey);
			olapStatisticService.generateOlapStatistics();
		} catch (NotFoundException e) {
			logger.error("Something went wrong when trying to generate olap statistics", e);
		} finally {
			semaphore.release();
			this.semaphore = null;
		}

	}
}
