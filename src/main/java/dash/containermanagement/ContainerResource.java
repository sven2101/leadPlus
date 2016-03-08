package dash.containermanagement;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import dash.vendormanagement.Vendor;
import dash.vendormanagement.VendorRepository;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by Andreas on 12.10.2015.
 */
@Component
@RestController
@RequestMapping("/api/rest/containers")
@Api(value = "containers", description = "Container API")
public class ContainerResource {

        @Autowired
        private ContainerRepository containerRepository;

        @ApiOperation(value = "Get all containers.", notes = "")
        @RequestMapping(method = RequestMethod.GET)
        @ResponseStatus(HttpStatus.OK)
        public Iterable<Container> get() {
                return containerRepository.findAll();
        }

        @ApiOperation(value = "Get a single container.", notes = "You have to provide a valid container ID.")
        @RequestMapping(method = RequestMethod.GET,
                value="{id}")
        @ResponseStatus(HttpStatus.OK)
        public Container findById(@ApiParam(required=true) @PathVariable Long id) {
                return containerRepository.findOne(id);
        }

        @ApiOperation(value = "Add a single container.", notes = "You have to provide a valid Container Object")
        @RequestMapping(method = RequestMethod.POST,
                consumes = {MediaType.APPLICATION_JSON_VALUE},
                produces = {MediaType.APPLICATION_JSON_VALUE})
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity<Void> add(@ApiParam(required=true) final @RequestBody Container container) {
                containerRepository.save(container);
                return new ResponseEntity<Void>(HttpStatus.OK);
        }

        @ApiOperation(value = "Update a single container.", notes = "")
        @RequestMapping(method=RequestMethod.PUT,
                value="{id}",
                consumes = {MediaType.APPLICATION_JSON_VALUE},
                produces = {MediaType.APPLICATION_JSON_VALUE})
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public Container update(@ApiParam(required=true) @PathVariable Long id, @ApiParam(required=true) final @RequestBody Container updateContainer) {
                Container container = containerRepository.findOne(id);
                container.setName(updateContainer.getName());
                container.setDescription(updateContainer.getDescription());
                container.setPrice(updateContainer.getPrice());
                return container;
        }

        @ApiOperation(value = "Delete a single container.", notes = "")
        @RequestMapping(method = RequestMethod.DELETE)
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public void delete(@ApiParam(required=true) @PathVariable Long id) {
                containerRepository.delete(id);
        }
}
