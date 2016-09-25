package dash.statisticmanagement.user.business;

public class UserStatistic {

	private int countLead;
	private int countOffer;
	private int countSale;
	private int countProcess;
	private double turnover;
	private double profit;
	private double discount;
	private int countProduct;


	public UserStatistic() {
		countLead =0;
		countOffer =0;
		countSale=0;
		countProcess=0;
		turnover=0;
		profit =0;
		discount=0;
		countProduct=0;
	}


	public void addCountLead(){
		countLead++;
	}
	public void addCountOffer(){
		countOffer++;
	}
	public void addCountSale(){
		countSale++;
	}
	public void addCountProcess(){
		countProcess++;
	}
	public void addCountTurnover(double value){
		turnover +=value;
	}
	
	public void addCountProfit(double value){
		profit +=value;
	}
	public void addCountdiscount(double value){
		discount +=value;
	}
	public void addCountProduct(int value){
		countProduct +=value;
	}
	
	
	public double getProfit() {
		return profit;
	}

	public void setProfit(double profit) {
		this.profit = profit;
	}

	
	public int getCountLead() {
		return countLead;
	}


	public void setCountLead(int countLead) {
		this.countLead = countLead;
	}


	public int getCountOffer() {
		return countOffer;
	}


	public void setCountOffer(int countOffer) {
		this.countOffer = countOffer;
	}


	public int getCountSale() {
		return countSale;
	}


	public void setCountSale(int countSale) {
		this.countSale = countSale;
	}


	public int getCountProcess() {
		return countProcess;
	}


	public void setCountProcess(int countProcess) {
		this.countProcess = countProcess;
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


	public int getCountProduct() {
		return countProduct;
	}


	public void setCountProduct(int countProduct) {
		this.countProduct = countProduct;
	}

}
