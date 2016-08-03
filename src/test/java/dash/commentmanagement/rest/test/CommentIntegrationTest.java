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
package dash.commentmanagement.rest.test;

import static org.junit.Assert.assertEquals;

import java.util.Calendar;

import org.apache.http.entity.ContentType;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import dash.Application;
import dash.commentmanagement.domain.Comment;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.inquirermanagement.domain.Inquirer;
import dash.inquirermanagement.domain.Title;
import dash.leadmanagement.domain.Lead;
import dash.offermanagement.domain.Offer;
import dash.processmanagement.business.IProcessService;
import dash.processmanagement.domain.Process;
import dash.processmanagement.domain.Status;
import dash.productmanagement.domain.Product;
import dash.salemanagement.domain.Sale;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.usermanagement.business.IUserService;
import dash.vendormanagement.domain.Vendor;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class CommentIntegrationTest extends BaseConfig implements IIntegrationTest {

	private final static String EXTENDED_URI = BASE_URI + REST_COMMENTS;

	@Autowired
	private IUserService userService;

	@Autowired
	private IProcessService processService;

	@Override
	@Test
	public void post() {
		Comment comment = create();
		HttpEntity<Comment> entity = new HttpEntity<Comment>(comment, headers);

		ResponseEntity<Comment> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entity, Comment.class);
		Comment responseComment = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(comment, responseComment);
	}

	@Override
	@Test
	public void get() {

		Comment comment = create();
		HttpEntity<Comment> entityCreateComment = new HttpEntity<Comment>(comment, headers);

		ResponseEntity<Comment> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateComment, Comment.class);
		Comment responseCreateComment = responseCreate.getBody();

		HttpEntity<Comment> entityGetComment = new HttpEntity<Comment>(headers);

		ResponseEntity<Comment> responseGetComment = restTemplate.exchange(EXTENDED_URI + "processes/{id}", HttpMethod.GET, entityGetComment, Comment.class,
				responseCreateComment.getProcess().getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetComment.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetComment.getStatusCode());
		assertEquals(responseCreateComment, responseGetComment.getBody());
	}

	//	@Test
	//	public void getAllByProcess() {
	//
	//		HttpEntity<Comment> entityGetComments = new HttpEntity<Comment>(headers);
	//
	//		ResponseEntity<Object[]> responseGetComments = restTemplate.exchange(EXTENDED_URI, HttpMethod.GET, entityGetComments, Object[].class);
	//		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetComments.getHeaders().getContentType().getCharSet());
	//		assertEquals(HttpStatus.OK, responseGetComments.getStatusCode());
	//	}

	@Override
	@Test
	public void put() {

		Comment comment = create();
		HttpEntity<Comment> entityCreateComment = new HttpEntity<Comment>(comment, headers);

		ResponseEntity<Comment> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateComment, Comment.class);
		Comment responseCreateComment = responseCreate.getBody();

		responseCreateComment.setCommentText("Haha");
		HttpEntity<Comment> entity = new HttpEntity<Comment>(responseCreateComment, headers);

		ResponseEntity<Comment> response = restTemplate.exchange(EXTENDED_URI, HttpMethod.PUT, entity, Comment.class, responseCreateComment.getId());
		Comment responseComment = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(responseCreateComment, responseComment);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Comment create() {

		Comment comment = new Comment();

		try {
			comment.setCommentText("Test");
			comment.setCreator(userService.getUserByName("test"));
			comment.setTimestamp(Calendar.getInstance());

			Process process = new Process();

			Inquirer inquirer = new Inquirer();
			inquirer.setFirstname("Max");
			inquirer.setLastname("Mustermann");
			inquirer.setCompany("Einkauf Mustermann GmbH");
			inquirer.setEmail("max.mustermann@einkauf-mustermann.de");
			inquirer.setPhone("07961/55166");
			inquirer.setTitle(Title.MR);

			Vendor vendor = new Vendor();
			vendor.setName("Karl Neu 9");
			vendor.setPhone("0761331234");

			Product container = new Product();
			container.setName("Kühlcontainer");
			container.setDescription("Dieser Kühlcontainer kühlt am aller besten");
			container.setPriceNetto(1000.00);

			Lead lead = new Lead();
			lead.setInquirer(inquirer);
			lead.setVendor(vendor);
			lead.setContainer(container);
			lead.setContainerAmount(30);
			lead.setMessage("Test Anfrage");
			lead.setDestination("Karlsruhe");

			Offer offer = new Offer();
			offer.setVendor(vendor);
			offer.setContainer(container);

			Sale sale = new Sale();
			sale.setVendor(vendor);
			sale.setContainer(container);

			process.setLead(lead);
			process.setOffer(offer);
			process.setSale(sale);
			process.setProcessor(userService.getUserByName("test"));
			process.setStatus(Status.OPEN);

			Process process2 = processService.save(process);

			comment.setProcess(process2);

		} catch (SaveFailedException | NotFoundException ex) {
			ex.printStackTrace();
		}

		return comment;
	}

}
