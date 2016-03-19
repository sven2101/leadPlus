package dash.processmanagement.lead;

import dash.processmanagement.lead.service.ILeadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Andreas on 12.10.2015.
 */
@RestController
@RequestMapping("/api/rest/processes/leads")
@Api(value = "leads", description = "Lead API")
public class LeadResource {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private ILeadService leadService;
    
    @ApiOperation(value = "Return all leads.", notes = "")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Lead> getAllLeads() { 
	return leadRepository.findAll(); 
    }

    @ApiOperation(value = "Return a single lead.", notes = "")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Lead getLeadById(@ApiParam(required=true) @PathVariable Long id) {
        return leadRepository.findOne(id);
    }

    @ApiOperation(value = "Add a single lead.", notes = "")
    @RequestMapping(method = RequestMethod.POST,
	    	    consumes = {MediaType.APPLICATION_JSON_VALUE},
	    	    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@ApiParam(required=true) @RequestBody @Valid Lead lead) {
        leadService.createLead(lead);
    }
    
    @ApiOperation(value = "Update a single lead.", notes = "")
    @RequestMapping(value="/{id}",
    		    method=RequestMethod.PUT,
    		    consumes = {MediaType.APPLICATION_JSON_VALUE},
    		    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public Lead update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody @Valid Lead updateLead) {
        Lead lead = leadRepository.findOne(id);

        lead.setInquirer(updateLead.getInquirer());
        lead.setVendor(updateLead.getVendor());
        lead.setContainer(updateLead.getContainer());
        lead.setTimestamp(updateLead.getTimestamp());
        lead.setContainerAmount(updateLead.getContainerAmount());
        lead.setDestination(updateLead.getDestination());
        lead.setMessage(updateLead.getMessage());
        
        return lead;
    }

    @ApiOperation(value = "Delete a single Lead.", notes = "")
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        leadRepository.delete(id);
    }
}
