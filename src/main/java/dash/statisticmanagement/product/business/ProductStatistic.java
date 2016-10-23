package dash.statisticmanagement.product.business;

import java.io.Serializable;

import dash.productmanagement.domain.Product;

public class ProductStatistic implements Serializable {

	private static final long serialVersionUID = -6224846432017168337L;
	
	private double count;
	private double turnover;
	private double discount;
	private int orderPositions;
	private Product product;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getOrderPositions() {
		return orderPositions;
	}

	public void setOrderPositions(int orderPositions) {
		this.orderPositions = orderPositions;
	}

	public ProductStatistic() {
		this.count = 0;
		this.turnover = 0;
		this.discount = 0;
		this.orderPositions = 0;
	}

	public void addCount(double count) {
		this.count += count;
	}

	public void addTurnover(double turnover) {
		this.turnover += turnover;
	}

	public void addOrderPosition() {
		this.orderPositions++;
	}

	public void addDiscount(double discount) {
		this.discount += discount;
	}

	public double getCount() {
		return count;
	}

	public void setCount(double count) {
		this.count = count;
	}

	public double getTurnover() {
		return turnover;
	}

	public void setTurnover(double turnover) {
		this.turnover = turnover;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(count);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(discount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + orderPositions;
		result = prime * result + ((product == null) ? 0 : product.hashCode());
		temp = Double.doubleToLongBits(turnover);
		result = prime * result + (int) (temp ^ (temp >>> 32));
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
		ProductStatistic other = (ProductStatistic) obj;
		if (Double.doubleToLongBits(count) != Double.doubleToLongBits(other.count))
			return false;
		if (Double.doubleToLongBits(discount) != Double.doubleToLongBits(other.discount))
			return false;
		if (orderPositions != other.orderPositions)
			return false;
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		if (Double.doubleToLongBits(turnover) != Double.doubleToLongBits(other.turnover))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ProductStatistic [count=" + count + ", turnover=" + turnover + ", discount=" + discount
				+ ", orderPositions=" + orderPositions + ", product=" + product + "]";
	}

}
