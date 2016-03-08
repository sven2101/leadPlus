package dash.vendormanagement;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Andreas on 12.10.2015.
 */

@Api(value = "vendors", description = "Vendor API")
@RestController
@RequestMapping("/api/rest/vendors")
public class VendorResource {

        @Autowired
        private VendorRepository vendorRepository;

        @ApiOperation(value = "Returns all vendors")
        @RequestMapping(method = RequestMethod.GET)
        public Iterable<Vendor> get() {
                return vendorRepository.findAll();
        }

        @ApiOperation(value = "Returns by VendorId specified vendor")
        @RequestMapping(method = RequestMethod.GET,
                value="{id}")
        public Vendor findById(@ApiParam(required = true) @PathVariable Long id) {
                return vendorRepository.findOne(id);
        }

        @ApiOperation(value = "Adds Vendor")
        @RequestMapping(method = RequestMethod.POST,
                consumes = {MediaType.APPLICATION_JSON_VALUE},
                produces = {MediaType.APPLICATION_JSON_VALUE})
        public ResponseEntity<Void> add(@ApiParam(required = true) @RequestBody Vendor vendor) {
                System.out.println(vendor);
                vendorRepository.save(vendor);
                return new ResponseEntity<Void>(HttpStatus.OK);
        }

        @ApiOperation(value = "Update Vendor")
        @RequestMapping(method=RequestMethod.PUT,
                value="{id}",
                consumes = {MediaType.APPLICATION_JSON_VALUE},
                produces = {MediaType.APPLICATION_JSON_VALUE})
        public Vendor update(@ApiParam(required = true) @PathVariable Long id,
                             @ApiParam(required = true) @RequestBody Vendor updateVendor) {
                Vendor vendor = vendorRepository.findOne(id);
                vendor.setName(updateVendor.getName());
                vendor.setPhone(updateVendor.getPhone());
                return vendor;
        }

        @ApiOperation(value = "Delete a single vendor.", notes = "You have to provide a valid vendor ID.")
        @RequestMapping(method = RequestMethod.DELETE)
        public void delete(@ApiParam(required = true) @PathVariable Long id) {
                vendorRepository.delete(id);
        }
}
