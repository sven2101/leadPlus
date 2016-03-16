package dash.processmanagement.offer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import dash.processmanagement.offer.service.IOfferService;

/**
 * Created by Andreas on 12.10.2015.
 */
@RestController
@RequestMapping("/api/rest/processes")
@Api(value = "Offers API")
public class OfferResource {

    @Autowired
    private OfferRepository offerRepository;
    
    @Autowired
    private IOfferService offerService;

    @ApiOperation(value = "Return a single offer.", notes = "")
    @RequestMapping(method = RequestMethod.GET, value="/offers/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Offer getOfferById(@PathVariable Long id) {
        return offerRepository.findOne(id);
    }

    @ApiOperation(value = "Add a single offer.", notes = "")
    @RequestMapping(value="/{processId}/offers",
	    		method = RequestMethod.POST,
	    		consumes = {MediaType.APPLICATION_JSON_VALUE},
	    		produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public void addOfferByProcessId(@PathVariable Long processId, @ApiParam(required=true) @RequestBody @Valid Offer offer) {
	offerService.createOffer(processId, offer);
    }
    
    @ApiOperation(value = "Update a single offer.", notes = "")
    @RequestMapping(method=RequestMethod.PUT,
                    value="/offers/{id}",
                    consumes = {MediaType.APPLICATION_JSON_VALUE},
                    produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Offer update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) @RequestBody @Valid Offer updateOffer) {
        Offer offer = offerRepository.findOne(id);
        
        offer.setProspect(updateOffer.getProspect());
        offer.setPrice(updateOffer.getPrice());
        offer.setDeliveryDate(updateOffer.getDeliveryDate());
        offer.setDeliveryAddress(updateOffer.getDeliveryAddress());
        
        offerRepository.save(offer);
        
        return offer;
    }

    @ApiOperation(value = "Delete a single offer.", notes = "")
    @RequestMapping(value = "/offers/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        offerRepository.delete(id);
    }
}
