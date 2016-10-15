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

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dash.common.AbstractWorkflow;
import io.swagger.annotations.ApiModelProperty;

@Entity
@SQLDelete(sql = "UPDATE order_position SET deleted = '1' WHERE id = ?")
@Where(clause = "deleted <> '1'")
@Table(name = "orderposition")
public class OrderPosition {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "orderposition_auto_gen")
	@SequenceGenerator(name = "orderposition_auto_gen", sequenceName = "orderposition_id_seq")
	@ApiModelProperty(hidden = true)
	@Column(name = "id")
	private long id;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Column(name = "deleted", nullable = false)
	private boolean deleted;

	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	@Where(clause = "deleted <> '1'")
	private Product product;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "workflow_id", nullable = false)
	@Where(clause = "deleted <> '1'")
	private AbstractWorkflow workflow;

	@NotNull
	@Column(name = "amount", nullable = false)
	private int amount;

	@ApiModelProperty(hidden = true)
	@NotNull
	@Digits(integer = 10, fraction = 4)
	@Column(name = "price", nullable = false)
	private double price;

	@NotNull
	@Column(name = "discount", nullable = false)
	private double discount;

	public OrderPosition() {

	}

	public long getId() {
		return id;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public AbstractWorkflow getWorkflow() {
		return workflow;
	}

	public void setWorkflow(AbstractWorkflow workflow) {
		this.workflow = workflow;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + amount;
		result = prime * result + (deleted ? 1231 : 1237);
		long temp;
		temp = Double.doubleToLongBits(discount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + (int) (id ^ (id >>> 32));
		temp = Double.doubleToLongBits(price);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((product == null) ? 0 : product.hashCode());
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
		OrderPosition other = (OrderPosition) obj;
		if (amount != other.amount)
			return false;
		if (deleted != other.deleted)
			return false;
		if (Double.doubleToLongBits(discount) != Double.doubleToLongBits(other.discount))
			return false;
		if (id != other.id)
			return false;
		if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
			return false;
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "OrderPosition [id=" + id + ", deleted=" + deleted + ", product=" + product + ", amount=" + amount + ", price=" + price + ", discount="
				+ discount + "]";
	}

}
