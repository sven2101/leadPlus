
package dash.statusmanagement.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
@RestController(value = "State Resource")
@RequestMapping(value = "/api/rest/processes/state", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "State API")
public class StatusResource {

}
