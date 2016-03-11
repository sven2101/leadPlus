package dash.leadmanagement;


import dash.Status;
import dash.containermanagement.ContainerRepository;
import dash.inquirermanagement.InquirerRepository;
import dash.vendormanagement.VendorRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ExposesResourceFor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Andreas on 12.10.2015.
 */
@RestController
//@ExposesResourceFor(Lead.class)
@RequestMapping("/api/rest/leads")
@Api(value = "leads", description = "Lead API")
public class LeadResource {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private ContainerRepository containerRepository;

    @Autowired
    private InquirerRepository inquirerRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @ApiOperation(value = "Returns all leads.", notes = "")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Lead> get() { return leadRepository.findAll(); }

    @ApiOperation(value = "Returns leads with a certain state", notes = "")
    @RequestMapping(method = RequestMethod.GET,
                    value= "state/{status}")
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Lead> get(@ApiParam(required=true) @PathVariable Status status) {
        return leadRepository.findApplicationsByStatus(status);
    }

    @ApiOperation(value = "Returns a single lead.", notes = "")
    @RequestMapping(method = RequestMethod.GET,
                    value="{id}")
    @ResponseStatus(HttpStatus.OK)
    public Lead findById(@ApiParam(required=true) @PathVariable Long id) {
        return leadRepository.findOne(id);
    }

    @ApiOperation(value = "Add a single lead.", notes = "")
    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> add(@ApiParam(required=true) @RequestBody Lead lead) {
        inquirerRepository.save(lead.getInquirer());
        vendorRepository.save(lead.getVendor());
        containerRepository.save(lead.getContainer());

        leadRepository.save(lead);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    @ApiOperation(value = "Update a single lead.", notes = "")
    @RequestMapping(method=RequestMethod.PUT,
            value="{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Lead update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody Lead updateContainer) {
        Lead application = leadRepository.findOne(id);

        return application;
    }

    @ApiOperation(value = "Delete a single Lead.", notes = "")
    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        leadRepository.delete(id);
    }
}
