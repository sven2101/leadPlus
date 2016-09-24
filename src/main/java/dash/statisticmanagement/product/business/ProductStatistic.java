package dash.statisticmanagement.product.business;

import dash.productmanagement.domain.Product;

public class ProductStatistic {

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

}
