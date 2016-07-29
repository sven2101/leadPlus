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
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import dash.Application;
import dash.commentmanagement.domain.Comment;
import dash.processmanagement.domain.Process;
import dash.test.BaseConfig;
import dash.test.IIntegrationTest;
import dash.usermanagement.domain.User;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(Application.class)
@WebIntegrationTest
public class CommentIntegrationTest extends BaseConfig implements IIntegrationTest {

	private static final String EXTENDED_URI = BASE_URI + "/api/rest/comments";

	@Before
	public void setup() {
		headers.clear();
		headers.add("Authorization", "Basic " + base64Creds);
		headers.setContentType(MediaType.APPLICATION_JSON);
	}

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

		HttpEntity<Comment> entityCreateComment = new HttpEntity<Comment>(create(), headers);

		ResponseEntity<Comment> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateComment, Comment.class);
		Comment responseCreateComment = responseCreate.getBody();

		HttpEntity<Comment> entityGetComment = new HttpEntity<Comment>(headers);

		ResponseEntity<Comment> responseGetComment = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.GET, entityGetComment, Comment.class,
				responseCreateComment.getId());

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), responseGetComment.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, responseGetComment.getStatusCode());
		assertEquals(create(), responseGetComment.getBody());
	}

	@Test
	public void put() {

		Comment comment = create();
		HttpEntity<Comment> entityCreateComment = new HttpEntity<Comment>(comment, headers);

		ResponseEntity<Comment> responseCreate = restTemplate.exchange(EXTENDED_URI, HttpMethod.POST, entityCreateComment, Comment.class);
		Comment responseCreateComment = responseCreate.getBody();

		comment.setCommentText("Haha");
		HttpEntity<Comment> entity = new HttpEntity<Comment>(comment, headers);

		ResponseEntity<Comment> response = restTemplate.exchange(EXTENDED_URI + "/{id}", HttpMethod.PUT, entity, Comment.class, responseCreateComment.getId());
		Comment responseComment = response.getBody();

		assertEquals(ContentType.APPLICATION_JSON.getCharset(), response.getHeaders().getContentType().getCharSet());
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(comment, responseComment);
	}

	@Override
	@Ignore
	public void delete() {

	}

	@Override
	public Comment create() {

		Comment comment = new Comment();
		comment.setCommentText("Test");
		comment.setCreator(new User());
		comment.setProcess(new Process());
		comment.setTimestamp(Calendar.getInstance());

		return comment;
	}

}
