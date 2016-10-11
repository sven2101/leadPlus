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

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
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

import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.registration.domain.Validation;

@Service
public class TenantService implements ITenantService {

	@Autowired
	private TenantRepository tenantRepository;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private AmazonRoute53 r53;

	@Override
	public Tenant createNewTenant(final Tenant tenant) {
		try {
			tenantRepository.save(tenant);
			createSchema(tenant);
			if (validateUniquenessOfSubdomain(tenant)) {
				System.out.println("CREATING SUBDOMAIN ON AWS.");
				// createTenantSubdomain(tenant);
			}
		} catch (Exception ex) {
			System.out.println("TENANT KEY already exists: " + ex.getMessage());
		}
		return tenant;
	}

	public void createSchema(final Tenant tenant) {
		Flyway flyway = new Flyway();
		flyway.setDataSource(dataSource);
		flyway.setSchemas(tenant.getTenantKey());
		flyway.migrate();
	}

	private boolean validateUniquenessOfSubdomain(final Tenant tenant) {
		ListResourceRecordSetsRequest request = new ListResourceRecordSetsRequest();
		request.setHostedZoneId("***REMOVED***");

		ListResourceRecordSetsResult result = r53.listResourceRecordSets(request);
		List<ResourceRecordSet> recordSets = result.getResourceRecordSets();
		boolean subdomainAlreadyExists = false;
		for (ResourceRecordSet recordSet : recordSets) {
			System.out.println("RECORD SET: " + recordSet.toString());
			if (recordSet.getName().contains(tenant.getTenantKey() + ".")) {
				subdomainAlreadyExists = true;
			}
		}
		return subdomainAlreadyExists;
	}

	public void createTenantSubdomain(final Tenant tenant) {

		System.out.println("TRY----------------------------------");

		List<ResourceRecord> records = new ArrayList<ResourceRecord>();
		ResourceRecord record = new ResourceRecord();
		record.setValue("***REMOVED***");
		records.add(record);

		ResourceRecordSet recordSet = new ResourceRecordSet();
		recordSet.setName(tenant.getTenantKey() + ".***REMOVED***");
		recordSet.setType(RRType.CNAME);
		recordSet.setTTL(new Long(60));
		recordSet.setResourceRecords(records);

		// Create the Change
		List<Change> changes = new ArrayList<Change>();
		Change change = new Change();
		change.setAction(ChangeAction.CREATE);
		change.setResourceRecordSet(recordSet);
		changes.add(change);

		// Create a batch and add the change to it
		ChangeBatch batch = new ChangeBatch();
		batch.setChanges(changes);

		// Create a Request and add the batch to it.
		ChangeResourceRecordSetsRequest request = new ChangeResourceRecordSetsRequest();
		request.setHostedZoneId("***REMOVED***");
		request.setChangeBatch(batch);

		// send the request
		ChangeResourceRecordSetsResult result = r53.changeResourceRecordSets(request);
		System.out.println(result.toString());

		System.out.println("DONE---------------------------------");
	}

	@Override
	public Validation uniqueTenantKey(Tenant tenant) {
		Validation validation = new Validation();
		validation.setValidation(validateUniquenessOfSubdomain(tenant));
		return validation;
	}

}
