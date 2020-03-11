/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.productmanagement.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.DeleteFailedException;
import dash.exceptions.EmailAlreadyExistsException;
import dash.exceptions.NotFoundException;
import dash.exceptions.SaveFailedException;
import dash.exceptions.UpdateFailedException;
import dash.exceptions.UsernameAlreadyExistsException;
import dash.productmanagement.business.IProductService;
import dash.productmanagement.domain.Product;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController(value = "Product Resource")
@RequestMapping(value = "/api/rest/products", consumes = { MediaType.ALL_VALUE }, produces = {
		MediaType.APPLICATION_JSON_VALUE })
@Api(value = "product")
public class ProductResource {

	@Autowired
	private IProductService productService;

	@ApiOperation(value = "Get all products.", notes = "")
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Product> getAll() {
		return productService.getAll();
	}

	@ApiOperation(value = "Get a single product.", notes = "You have to provide a valid product ID.")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Product getById(@ApiParam(required = true) @PathVariable final Long id) throws NotFoundException {
		return productService.getById(id);
	}

	@ApiOperation(value = "Add a single product.", notes = "You have to provide a valid product Object")
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Product save(@ApiParam(required = true) @RequestBody @Valid final Product product)
			throws SaveFailedException, ConsistencyFailedException {
		return productService.save(product);
	}

	@RequestMapping(value = "/{id}/image", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Post a file. ", notes = "")
	public Product setImage(@PathVariable final long id, @RequestParam("file") MultipartFile file)
			throws SaveFailedException, NotFoundException, UpdateFailedException, UsernameAlreadyExistsException,
			EmailAlreadyExistsException, ConsistencyFailedException {
		return productService.setImage(id, file);
	}

	@RequestMapping(value = "/{id}/image", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get user Product Picture.")
	public ResponseEntity<?> getProductPictureById(@PathVariable final long id) throws NotFoundException {
		Product product = productService.getById(id);
		if (product != null) {
			byte[] body = new byte[0];
			if (product.getPicture() != null && product.getPicture().getContent() != null) {
				body = product.getPicture().getContent();
			}
			HttpHeaders header = new HttpHeaders();
			header.setContentType(MediaType.MULTIPART_FORM_DATA);
			header.setContentLength(body.length);
			return new ResponseEntity<byte[]>(body, header, HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
	}

	@ApiOperation(value = "Update a single product.", notes = "")
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Product update(@ApiParam(required = true) @RequestBody @Valid final Product product)
			throws UpdateFailedException, SaveFailedException, ConsistencyFailedException {
		return productService.save(product);
	}

	@ApiOperation(value = "Delete a single product.", notes = "")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void delete(@ApiParam(required = true) @PathVariable final Long id) throws DeleteFailedException {
		productService.delete(id);
	}

	@ApiOperation(value = "Get a single product.", notes = "You have to provide a valid product ID.")
	@RequestMapping(value = "/includedeleted/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Product getProductByIdIncludeDeleted(@ApiParam(required = true) @PathVariable final Long id)
			throws NotFoundException {
		return productService.getProductByIdIncludeDeleted(id);
	}
}
