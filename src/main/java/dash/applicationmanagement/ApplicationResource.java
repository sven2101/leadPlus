package dash.applicationmanagement;


import dash.Status;
import dash.containermanagement.ContainerRepository;
import dash.inquirermanagement.InquirerRepository;
import dash.vendormanagement.VendorRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Andreas on 12.10.2015.
 */
@RestController
@ExposesResourceFor(Application.class)
@RequestMapping("/api/rest/applications")
@Api(value = "applications", description = "Application API")
public class ApplicationResource {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private InquirerRepository inquirerRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @ApiOperation(value = "Returns all applications.", notes = "")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Application> get() { return applicationRepository.findAll(); }

    @ApiOperation(value = "Returns applications with a certain state", notes = "")
    @RequestMapping(method = RequestMethod.GET,
                    value= "state/{status}")
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Application> get(@ApiParam(required=true) @PathVariable Status status) {
        return applicationRepository.findApplicationsByStatus(status);
    }

    @ApiOperation(value = "Returns a single application.", notes = "")
    @RequestMapping(method = RequestMethod.GET,
                    value="{id}")
    @ResponseStatus(HttpStatus.OK)
    public Application findById(@ApiParam(required=true) @PathVariable Long id) {
        return applicationRepository.findOne(id);
    }

    @ApiOperation(value = "Add a single application.", notes = "")
    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> add(@ApiParam(required=true) @RequestBody Application application) {
        inquirerRepository.save(application.getInquirer());
        vendorRepository.save(application.getVendor());
        //containerRepository.save(application.getContainer());

        applicationRepository.save(application);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    @ApiOperation(value = "Update a single application.", notes = "")
    @RequestMapping(method=RequestMethod.PUT,
            value="{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Application update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody Application updateContainer) {
        Application application = applicationRepository.findOne(id);

        return application;
    }

    @ApiOperation(value = "Delete a single Application.", notes = "")
    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        applicationRepository.delete(id);
    }
}
