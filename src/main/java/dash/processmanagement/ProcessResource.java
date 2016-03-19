package dash.processmanagement;

import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.service.IProcessService;
import dash.processmanagement.status.Status;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Andreas on 12.10.2015.
 */
@RestController
@RequestMapping("/api/rest/processes")
@Api(value = "Process API")
public class ProcessResource {

    @Autowired
    private ProcessRepository processRepository;
    
    @Autowired
    private IProcessService processService;

    @ApiOperation(value = "Returns a single process.", notes = "")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Process findById(@ApiParam(required=true) @PathVariable Long id) {
        return processRepository.findOne(id);
    }
    
    @ApiOperation(value = "Returns all processes.", notes = "")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Process> get() { 
	return processRepository.findAll(); 
    }

    @ApiOperation(value = "Returns processes with a certain state", notes = "")
    @RequestMapping(value= "/state/{status}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Process> get(@ApiParam(required=true) @PathVariable Status status) {
        return processRepository.findProcessesByStatus(status);
    }
    
    @ApiOperation(value = "Update a single process.", notes = "")
    @RequestMapping(value="/{id}",
	    	    method=RequestMethod.PUT,
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Process update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody Process updateProcess) {
        Process process = processRepository.findOne(id);

        process.setLead(updateProcess.getLead());
        process.setOffer(updateProcess.getOffer());
        process.setSale(updateProcess.getSale());
        process.setStatus(updateProcess.getStatus());

        processRepository.save(process);
        
        return process;
    }
    
    @ApiOperation(value = "Delete a single process.", notes = "")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        processRepository.delete(id);
    }
    
    @ApiOperation(value = "Creates a process.", notes = "")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void createProcess(@RequestBody @Valid Process process) { 
	processService.createProcess(process); 
    }
    
    @ApiOperation(value = "Creates processes based on a List of Processes.", notes = "")
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void createProcesses(@RequestBody List<Process> processes) { 
	processService.createProcesses(processes); 
    }
    
    @ApiOperation(value = "Returns a List of a specified kind with a specific status.", notes = "")
    @RequestMapping(value="/status/{status}/{kind}/", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<?> getElementsByStatus(@ApiParam(required=true) @PathVariable Status status, String kind) {    
	return processService.getElementsByStatus(status, kind);
    }
    
    @ApiOperation(value = "Return a single lead.", notes = "")
    @RequestMapping(value = "/{processId}/leads", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Lead getLeadByProcess(@PathVariable Long processId) { 
	return processRepository.findOne(processId).getLead(); 
    }
    
    @ApiOperation(value = "Creates a single lead.", notes = "")
    @RequestMapping(value = "/{processId}/leads", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createLeadByProcess(@PathVariable Long processId, @RequestBody @Valid Lead lead) { 
	processService.createLead(processId, lead);
    }
    
    @ApiOperation(value = "Returns single offer.", notes = "")
    @RequestMapping(value="{processId}/offers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Offer getOfferByProcess(@PathVariable Long processId) { 
	return processRepository.findOne(processId).getOffer(); 
    }
    
    @ApiOperation(value = "Creates a single offer.", notes = "")
    @RequestMapping(value = "/{processId}/offers", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createOfferByProcess(@PathVariable Long processId, @RequestBody @Valid Offer offer) { 
	processService.createOffer(processId, offer);
    }
    
    @ApiOperation(value = "Returns a single sale.", notes = "")
    @RequestMapping(value="{processId}/sales", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Sale getSaleByProcess(@PathVariable Long processId) { 
	return processRepository.findOne(processId).getSale(); 
    }
    
    @ApiOperation(value = "Creates a single sale.", notes = "")
    @RequestMapping(value = "/{processId}/sales", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createLeadByProcess(@PathVariable Long processId, @RequestBody @Valid Sale sale) { 
	processService.createSale(processId, sale);
    }
}

