package dash.processmanagement;

import dash.exceptions.ProcessNotFoundException;
import dash.exceptions.StatusNotFoundException;
import dash.processmanagement.comment.Comment;
import dash.processmanagement.lead.Lead;
import dash.processmanagement.offer.Offer;
import dash.processmanagement.sale.Sale;
import dash.processmanagement.service.IProcessService;
import dash.processmanagement.status.Status;
import dash.usermanagement.User;
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
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Process findById(@ApiParam(required = true) @PathVariable Long id) {
        return processRepository.findOne(id);
    }

    @ApiOperation(value = "Returns all processes.", notes = "")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Process> get() {
        return processRepository.findAll();
    }

    @ApiOperation(value = "Returns processes with a certain state", notes = "")
    @RequestMapping(value = "/state/{status}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Iterable<Process> get(@ApiParam(required = true) @PathVariable Status status) {
        return processRepository.findProcessesByStatus(Status.valueOf("status"));
    }

    @ApiOperation(value = "Returns list of leads, which are related to a process status.", notes = "")
    @RequestMapping(value = "/state/{status}/leads", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Lead> getLeadsByProcessStatus(@ApiParam(required = true) @PathVariable String status) throws StatusNotFoundException {
        return processRepository.findByStatusAndLeadIsNotNull(Status.getStatus(status));
    }

    @ApiOperation(value = "Returns list of offers, which are related to a process status.", notes = "")
    @RequestMapping(value = "/state/{status}/offers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Offer> getOffersByProcessStatus(@ApiParam(required = true) @PathVariable String status) throws StatusNotFoundException {
        return processRepository.findByStatusAndOfferIsNotNull(Status.getStatus(status));
    }

    @ApiOperation(value = "Returns list of sales, which are related to a process status.", notes = "")
    @RequestMapping(value = "/state/{status}/sales", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Sale> getSalesByProcessStatus(@ApiParam(required = true) @PathVariable String status) throws StatusNotFoundException {
        return processRepository.findByStatusAndSaleIsNotNull(Status.getStatus(status));
    }

    @ApiOperation(value = "Returns status", notes = "")
    @RequestMapping(value = "/{processId}/status", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Status getStatusByProcessId(@ApiParam(required = true) @PathVariable Long processId) {
        return processRepository.findOne(processId).getStatus();
    }

    @ApiOperation(value = "Update a single process.", notes = "")
    @RequestMapping(value = "/{processId}",
            method = RequestMethod.PUT,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Process update(@ApiParam(required = true) @PathVariable Long processId, @ApiParam(required = true) @RequestBody Process updateProcess) {
        Process process = processRepository.findOne(processId);

        process.setLead(updateProcess.getLead());
        process.setOffer(updateProcess.getOffer());
        process.setSale(updateProcess.getSale());
        process.setStatus(updateProcess.getStatus());
        process.setProcessor(updateProcess.getProcessor());

        processRepository.save(process);

        return process;
    }

    @ApiOperation(value = "Returns processor.", notes = "")
    @RequestMapping(value = "/{processId}/processor", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public User getProcessor(@ApiParam(required = true) @PathVariable Long processId) {
        return processRepository.findOne(processId).getProcessor();
    }

    @ApiOperation(value = "Puts processor to process", notes = "")
    @RequestMapping(value = "/{processId}/processors", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void createProcessorByProcessId(@PathVariable Long processId, @RequestBody String username) throws Exception {
        processService.createProcessor(processId, username);
    }

    @ApiOperation(value = "Returns comments of a certain process.", notes = "")
    @RequestMapping(value = "/{processId}/comments", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Comment> getComments(@ApiParam(required = true) @PathVariable Long processId) {
        return processRepository.findOne(processId).getComments();
    }

    @ApiOperation(value = "Creates a comment.", notes = "")
    @RequestMapping(value = "/{processId}/comments", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void createProcess(@ApiParam(required = true) @PathVariable Long processId, @RequestBody @Valid Comment comment) throws Exception {
        processService.createComment(processId, comment);
    }

    @ApiOperation(value = "Delete a single process.", notes = "")
    @RequestMapping(value = "/{processId}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@ApiParam(required = true) @PathVariable Long processId) {
        processRepository.delete(processId);
    }

    @ApiOperation(value = "Creates a process.", notes = "")
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createProcess(@RequestBody @Valid Process process) {
        processService.createProcess(process);
    }

    @ApiOperation(value = "Creates processes based on a List of Processes.", notes = "")
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void createProcesses(@RequestBody List<Process> processes) {
        processService.createProcesses(processes);
    }

    @ApiOperation(value = "Modifie status.", notes = "")
    @RequestMapping(value = "/{processId}/status", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void updateStatusByProcessId(@PathVariable Long processId, @RequestBody String status) throws ProcessNotFoundException, StatusNotFoundException {
        processService.updateStatus(processId, Status.getStatus(status));
    }

    @ApiOperation(value = "Returns a list of leads.", notes = "")
    @RequestMapping(value = "/leads", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Lead> getProcessWithLeads() {
        return processRepository.findByLeadIsNotNull();
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
    public void createLeadByProcess(@PathVariable Long processId, @RequestBody @Valid Lead lead) throws ProcessNotFoundException {
        processService.createLead(processId, lead);
    }

    @ApiOperation(value = "Returns a list of offers.", notes = "")
    @RequestMapping(value = "/offers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Offer> getProcessWithOffers() {
        return processRepository.findByOfferIsNotNull();
    }

    @ApiOperation(value = "Returns single offer.", notes = "")
    @RequestMapping(value = "{processId}/offers", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Offer getOfferByProcess(@PathVariable Long processId) {
        return processRepository.findOne(processId).getOffer();
    }

    @ApiOperation(value = "Creates a single offer.", notes = "")
    @RequestMapping(value = "/{processId}/offers", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createOfferByProcess(@PathVariable Long processId, @RequestBody @Valid Offer offer) throws ProcessNotFoundException {
        processService.createOffer(processId, offer);
    }

    @ApiOperation(value = "Returns a list of sales.", notes = "")
    @RequestMapping(value = "/sales", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Sale> getProcessWithSales() {
        return processRepository.findBySaleIsNotNull();
    }

    @ApiOperation(value = "Returns a list of latest 10 sales.", notes = "")
    @RequestMapping(value = "/latestSales", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Sale> getProcessWithLatestSales() {
        return processRepository.findTop10BySaleIsNotNullOrderBySaleTimestampDesc();

    }

    @ApiOperation(value = "Returns a single sale.", notes = "")
    @RequestMapping(value = "{processId}/sales", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Sale getSaleByProcess(@PathVariable Long processId) {
        return processRepository.findOne(processId).getSale();
    }

    @ApiOperation(value = "Creates a single sale.", notes = "")
    @RequestMapping(value = "/{processId}/sales", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createSaleByProcess(@PathVariable Long processId, @RequestBody @Valid Sale sale) throws ProcessNotFoundException {
        processService.createSale(processId, sale);
    }
}

