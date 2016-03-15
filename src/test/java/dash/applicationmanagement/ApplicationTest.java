package dash.applicationmanagement;

import com.fasterxml.jackson.databind.ObjectMapper;

import dash.processmanagement.lead.inquirer.Inquirer;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by Andreas on 17.01.2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebIntegrationTest
public class ApplicationTest {

    public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public static final String hostname = "localhost:";
    public static final String port = "8080";
    public static final String api = "/api/rest";
    public static final String resource = "/inquirers";
    public static final String address = "http://"+hostname+port+api+resource;

    RestTemplate restTemplate = new TestRestTemplate();

    @Test
    public void testRequest() throws Exception {

        //Building the Request body data
        /*
    	Inquirer inquirer = new Inquirer("Andreas", "Foitzik", "get-net", "andreas.foitzik@get-net.eu");

        ResponseEntity<Inquirer> entity = restTemplate.postForEntity(
                "http://localhost:" + port + "/rest/process/start",
                inquirer,
                Inquirer.class);

        assertEquals(HttpStatus.OK, entity.getStatusCode());
        */
    }
}
