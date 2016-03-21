package dash.processmanagement.offer;

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
@RequestMapping("/api/rest/processes/offers")
@Api(value = "Offers API")
public class OfferResource {

    @Autowired
    private OfferRepository offerRepository;

    @ApiOperation(value = "Return a single offer.", notes = "")
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Offer getOfferById(@PathVariable Long id) {
        return offerRepository.findOne(id);
    }
   
    @ApiOperation(value = "Update a single offer.", notes = "")
    @RequestMapping(method=RequestMethod.PUT,
                    value="/{id}",
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
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@ApiParam(required=true) @PathVariable Long id) {
        offerRepository.delete(id);
    }
}
