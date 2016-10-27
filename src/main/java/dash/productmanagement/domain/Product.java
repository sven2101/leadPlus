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

package dash.productmanagement.domain;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.fileuploadmanagement.domain.FileUpload;
import io.swagger.annotations.ApiModelProperty;

@Entity
@SQLDelete(sql = "UPDATE product SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "product")
public class Product implements Serializable {

	private static final long serialVersionUID = 2316129901873904110L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_auto_gen")
	@SequenceGenerator(name = "product_auto_gen", sequenceName = "product_id_seq", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "name", nullable = false)
	private String name;

	@ApiModelProperty(hidden = true)
	@Size(max = 255)
	@Column(name = "description", length = 255, nullable = true)
	private String description;

	@Enumerated(EnumType.STRING)
	@ApiModelProperty(hidden = true)
	@Column(name = "productstate", length = 255, nullable = true)
	private ProductState productState;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "timestamp", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar timestamp;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deactivated", nullable = false)
	private boolean deactivated;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "pricenetto", nullable = false)
	private Double priceNetto;

	@JsonProperty(access = Access.WRITE_ONLY)
	@ApiModelProperty(hidden = true)
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "picture_fk", nullable = true)
	private FileUpload picture;

	@Size(max = 255)
	@Column(name = "productnumber")
	private String productNumber;

	public Product() {
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public ProductState getProductState() {
		return productState;
	}

	public void setProductState(ProductState productState) {
		this.productState = productState;
	}

	public boolean isDeactivated() {
		return deactivated;
	}

	public void setDeactivated(boolean deactivated) {
		this.deactivated = deactivated;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public FileUpload getPicture() {
		return picture;
	}

	public void setPicture(FileUpload picture) {
		this.picture = picture;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPriceNetto() {
		return priceNetto;
	}

	public void setPriceNetto(Double priceNetto) {
		this.priceNetto = priceNetto;
	}

	public String getProductNumber() {
		return productNumber;
	}

	public void setProductNumber(String productNumber) {
		this.productNumber = productNumber;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (deactivated ? 1231 : 1237);
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((picture == null) ? 0 : picture.hashCode());
		result = prime * result + ((priceNetto == null) ? 0 : priceNetto.hashCode());
		result = prime * result + ((productNumber == null) ? 0 : productNumber.hashCode());
		result = prime * result + ((productState == null) ? 0 : productState.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (deactivated != other.deactivated)
			return false;
		if (deleted != other.deleted)
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (picture == null) {
			if (other.picture != null)
				return false;
		} else if (!picture.equals(other.picture))
			return false;
		if (priceNetto == null) {
			if (other.priceNetto != null)
				return false;
		} else if (!priceNetto.equals(other.priceNetto))
			return false;
		if (productNumber == null) {
			if (other.productNumber != null)
				return false;
		} else if (!productNumber.equals(other.productNumber))
			return false;
		if (productState != other.productState)
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", deleted=" + deleted + ", name=" + name + ", description=" + description
				+ ", productState=" + productState + ", timestamp=" + timestamp + ", deactivated=" + deactivated
				+ ", priceNetto=" + priceNetto + ", picture=" + picture + "]";
	}

}
