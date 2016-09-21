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

import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import dash.fileuploadmanagement.domain.FileUpload;

@Entity
@SQLDelete(sql = "UPDATE product SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private boolean deleted;

	private String name;
	private String description;

	@Enumerated(EnumType.STRING)
	private ProductState productState;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	private Calendar timestamp;

	private boolean deactivated;

	private double priceNetto;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonProperty(access = Access.WRITE_ONLY)
	private FileUpload picture;

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

	public void setId(long id) {
		this.id = id;
	}

	public Product() {

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

	public double getPriceNetto() {
		return priceNetto;
	}

	public void setPriceNetto(double priceNetto) {
		this.priceNetto = priceNetto;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (deactivated ? 1231 : 1237);
		result = prime * result + (deleted ? 1231 : 1237);
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((picture == null) ? 0 : picture.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		long temp;
		temp = Double.doubleToLongBits(priceNetto);
		result = prime * result + (int) (temp ^ (temp >>> 32));
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
		if (picture == null) {
			if (other.picture != null)
				return false;
		} else if (!picture.equals(other.picture))
			return false;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (Double.doubleToLongBits(priceNetto) != Double.doubleToLongBits(other.priceNetto))
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
				+ ", priceNetto=" + priceNetto + ", fileUpload=" + picture + "]";
	}

}
