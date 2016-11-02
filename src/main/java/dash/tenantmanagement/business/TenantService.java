/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/
package dash.tenantmanagement.business;

import static dash.Constants.BECAUSE_OF_OBJECT_IS_NULL;
import static dash.Constants.CREATING_SUBDOMAIN;
import static dash.Constants.TENANT_ALREADY_EXISTS;
import static dash.Constants.TENANT_NOT_FOUND;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.route53.AmazonRoute53;
import com.amazonaws.services.route53.model.Change;
import com.amazonaws.services.route53.model.ChangeAction;
import com.amazonaws.services.route53.model.ChangeBatch;
import com.amazonaws.services.route53.model.ChangeResourceRecordSetsRequest;
import com.amazonaws.services.route53.model.ChangeResourceRecordSetsResult;
import com.amazonaws.services.route53.model.ListResourceRecordSetsRequest;
import com.amazonaws.services.route53.model.ListResourceRecordSetsResult;
import com.amazonaws.services.route53.model.RRType;
import com.amazonaws.services.route53.model.ResourceRecord;
import com.amazonaws.services.route53.model.ResourceRecordSet;

import dash.exceptions.NotFoundException;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.registration.domain.Validation;

@Service
public class TenantService implements ITenantService {

	private static final String SPRINT_PROFILE_PRODUCTION = "production";
	private static final String RESOURCE_RECORD_SET_CNAME = "CNAME";
	private static final String WWW = "www";

	private static final Logger logger = Logger.getLogger(TenantService.class);

	@Value("${hostname.suffix}")
	private String hostnameSuffix;

	@Value("${zone.hosted.id}")
	private String hostedZoneId;

	@Value("${spring.profiles.active}")
	private String springProfileActive;

	@Autowired
	private TenantRepository tenantRepository;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private AmazonRoute53 r53;

	@Override
	public Tenant getTenantByName(final String name) throws NotFoundException {
		if (Optional.ofNullable(name).isPresent()) {
			return tenantRepository.findByTenantKey(name);
		} else {
			NotFoundException cnfex = new NotFoundException(TENANT_NOT_FOUND);
			logger.error(TENANT_NOT_FOUND + TenantService.class.getSimpleName() + BECAUSE_OF_OBJECT_IS_NULL, cnfex);
			throw cnfex;
		}
	}

	@Override
	public Tenant createNewTenant(final Tenant tenant) {
		try {
			tenant.setEnabled(true);
			tenant.getLicense().getTerm().add(Calendar.YEAR, 1);
			if (!subdomainAlreadyExists(tenant) && springProfileActive.equals(SPRINT_PROFILE_PRODUCTION)) {
				createTenantSubdomain(tenant);
				createSchema(tenant);
				tenantRepository.save(tenant);
				logger.debug(CREATING_SUBDOMAIN + tenant.getTenantKey());
			}
		} catch (Exception ex) {
			logger.error(TENANT_ALREADY_EXISTS + tenant.getTenantKey(), ex);
		}
		return tenant;
	}

	public void createSchema(final Tenant tenant) {
		Flyway flyway = new Flyway();
		flyway.setDataSource(dataSource);
		flyway.setSchemas(tenant.getTenantKey());
		flyway.migrate();
	}

	private boolean subdomainAlreadyExists(final Tenant tenant) {
		ListResourceRecordSetsRequest request = new ListResourceRecordSetsRequest();
		request.setHostedZoneId(hostedZoneId);

		ListResourceRecordSetsResult result = r53.listResourceRecordSets(request);
		List<ResourceRecordSet> recordSets = result.getResourceRecordSets();
		boolean subdomainAlreadyExists = false;
		for (ResourceRecordSet recordSet : recordSets) {
			if (recordSet.getType().equals(RESOURCE_RECORD_SET_CNAME)) {
				for (String parts : recordSet.getName().split("\\.")) {
					if (parts.equals(tenant.getTenantKey()))
						subdomainAlreadyExists = true;
				}
			}
		}
		return subdomainAlreadyExists;
	}

	public void createTenantSubdomain(final Tenant tenant) {

		List<ResourceRecord> records = new ArrayList<>();

		ResourceRecord record = new ResourceRecord();
		record.setValue(hostnameSuffix);
		records.add(record);

		//Resource Record Set CNAME for tenantKey.leadplus.io
		ResourceRecordSet recordSet = new ResourceRecordSet();
		recordSet.setName(tenant.getTenantKey() + "." + hostnameSuffix);
		recordSet.setType(RRType.CNAME);
		recordSet.setTTL(Long.valueOf(300));
		recordSet.setResourceRecords(records);

		//change for tenantKey.leadplus.io
		Change change = new Change();
		change.setAction(ChangeAction.CREATE);
		change.setResourceRecordSet(recordSet);

		//Resource Record Set CNAME for tenantKey.leadplus.io
		ResourceRecordSet recordSetWWW = new ResourceRecordSet();
		recordSetWWW.setName(WWW + "." + tenant.getTenantKey() + "." + hostnameSuffix);
		recordSetWWW.setType(RRType.CNAME);
		recordSetWWW.setTTL(Long.valueOf(300));
		recordSetWWW.setResourceRecords(records);

		//change for www.tenantKey.leadplus.io
		Change changeWWW = new Change();
		changeWWW.setAction(ChangeAction.CREATE);
		changeWWW.setResourceRecordSet(recordSetWWW);

		// Create the Change
		List<Change> changes = new ArrayList<>();
		changes.add(change);
		changes.add(changeWWW);

		// Create a batch and add the change to it
		ChangeBatch batch = new ChangeBatch();
		batch.setChanges(changes);

		// Create a Request and add the batch to it.
		ChangeResourceRecordSetsRequest request = new ChangeResourceRecordSetsRequest();
		request.setHostedZoneId(hostedZoneId);
		request.setChangeBatch(batch);

		// send the request
		ChangeResourceRecordSetsResult result = r53.changeResourceRecordSets(request);
		logger.debug("Result of creating Resource Record: " + result.toString());
		// TODO - verify Result
	}

	@Override
	public Validation uniqueTenantKey(Tenant tenant) {
		final Validation validation = new Validation();
		final Tenant validateTenant;

		boolean proofUniquenessLocal = true;
		boolean proofUniquenessRemote = true;

		try {
			validateTenant = getTenantByName(tenant.getTenantKey());
			if (validateTenant == null)
				proofUniquenessLocal = false;
		} catch (NotFoundException nfex) {
			proofUniquenessLocal = false;
			logger.error("Validate uniqueness of Tenant: " + TenantService.class.getSimpleName(), nfex);
		}

		if (springProfileActive.equals(SPRINT_PROFILE_PRODUCTION))
			proofUniquenessRemote = subdomainAlreadyExists(tenant);
		else
			proofUniquenessRemote = false;

		if (proofUniquenessLocal || proofUniquenessRemote)
			validation.setValidation(true);
		else if (!proofUniquenessLocal && !proofUniquenessRemote)
			validation.setValidation(false);

		return validation;
	}

	@Override
	public List<Tenant> getAllTenants() {
		return tenantRepository.findAll();
	}

}
