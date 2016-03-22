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

    @ApiOperation(value = "Return a single lead.", notes = "")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Lead getLeadById(@ApiParam(required = true) @PathVariable Long id) {
        return leadRepository.findOne(id);
    }

    @ApiOperation(value = "Add a single lead.", notes = "")
    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@ApiParam(required = true) @RequestBody @Valid Lead lead) {
        leadService.createLead(lead);
    }

    @ApiOperation(value = "Update a single lead.", notes = "")
    @RequestMapping(value = "/{id}",
            method = RequestMethod.PUT,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public Lead update(@ApiParam(required = true) @PathVariable Long id, @ApiParam(required = true) @RequestBody @Valid Lead updateLead) {
        Lead lead = leadRepository.findOne(id);

        //set inquirer datas
        lead.getInquirer().setFirstname(updateLead.getInquirer().getFirstname());
        lead.getInquirer().setLastname(updateLead.getInquirer().getLastname());
        lead.getInquirer().setCompany(updateLead.getInquirer().getCompany());
        lead.getInquirer().setEmail(updateLead.getInquirer().getEmail());
        lead.getInquirer().setPhone(updateLead.getInquirer().getPhone());
        lead.getInquirer().setTitle(updateLead.getInquirer().getTitle());

        //set vendor datas
        lead.getVendor().setName(updateLead.getVendor().getName());
        lead.getVendor().setPhone(updateLead.getVendor().getPhone());

        //set container datas
        lead.getContainer().setName(updateLead.getContainer().getName());
        lead.getContainer().setDescription(updateLead.getContainer().getDescription());
        lead.getContainer().setPriceNetto(updateLead.getContainer().getPriceNetto());

        //set main data
        lead.setTimestamp(updateLead.getTimestamp());
        lead.setContainerAmount(updateLead.getContainerAmount());
        lead.setDestination(updateLead.getDestination());
        lead.setMessage(updateLead.getMessage());
        return leadRepository.save(lead);
    }

    @ApiOperation(value = "Delete a single Lead.", notes = "")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@ApiParam(required = true) @PathVariable Long id) {
        leadRepository.delete(id);
    }
}
