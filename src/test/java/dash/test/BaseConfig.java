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
package dash.test;

import org.apache.commons.codec.binary.Base64;
import org.junit.After;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import dash.commentmanagement.business.CommentRepository;
import dash.containermanagement.business.ContainerRepository;
import dash.customermanagement.business.CustomerRepository;
import dash.inquirermanagement.business.InquirerRepository;
import dash.leadmanagement.business.LeadRepository;
import dash.offermanagement.business.OfferRepository;
import dash.processmanagement.business.ProcessRepository;
import dash.prospectmanagement.business.ProspectRepository;
import dash.salemanagement.business.SaleRepository;
import dash.usermanagement.business.UserRepository;
import dash.usermanagement.domain.Role;
import dash.usermanagement.domain.User;
import dash.usermanagement.settings.language.Language;
import dash.vendormanagement.business.VendorRepository;

public class BaseConfig {

	protected final static String BASE_URI = "http://localhost:5000";
	protected final static String USERNAME = "test";
	protected final static String PASSWORD = "test";

	protected final static String REST_COMMENTS = "/api/rest/comments";
	protected final static String REST_CONTAINERS = "/api/rest/containers";
	protected final static String REST_CUSTOMERS = "/api/rest/customers";
	protected final static String REST_INQUIRERS = "/api/rest/inquirers";
	protected final static String REST_LEADS = "/api/rest/leads";
	protected final static String REST_OFFERS = "/api/rest/offers";
	protected final static String REST_PROCESSES = "/api/rest/processes";
	protected final static String REST_PROSPECTS = "/api/rest/prospects";
	protected final static String REST_SALES = "/api/rest/sales";
	protected final static String REST_VENDORS = "/api/rest/vendors";

	protected RestTemplate restTemplate = new TestRestTemplate();
	protected HttpHeaders headers = new HttpHeaders();

	protected String plainCreds = USERNAME + ":" + PASSWORD;
	protected byte[] plainCredsBytes = plainCreds.getBytes();
	protected byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
	protected String base64Creds = new String(base64CredsBytes);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private ContainerRepository containerRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private InquirerRepository inquirerRepository;

	@Autowired
	private LeadRepository leadRepository;

	@Autowired
	private OfferRepository offerRepository;

	@Autowired
	private ProspectRepository prospectRepository;

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private VendorRepository vendorRepository;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Before
	public void setup() {
		User test = new User();

		test.setUsername("test".toLowerCase());
		test.setPassword(passwordEncoder().encode("test"));
		test.setEmail("test@eviarc.com");
		test.setRole(Role.USER);
		test.setEnabled(true);
		test.setLanguage(Language.DE);

		userRepository.save(test);

		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

	@After
	public void after() {
		commentRepository.deleteAll();

		processRepository.deleteAll();

		leadRepository.deleteAll();
		offerRepository.deleteAll();
		saleRepository.deleteAll();

		inquirerRepository.deleteAll();
		prospectRepository.deleteAll();
		customerRepository.deleteAll();

		containerRepository.deleteAll();

		vendorRepository.deleteAll();

		userRepository.deleteAll();
	}
}
