package dash.statisticmanagement.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.statisticmanagement.product.business.ProductStatistic;
import dash.statisticmanagement.user.business.UserStatistic;

@Entity
@Table(name = "olap")
public class OLAP {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "olap_auto_gen")
	@SequenceGenerator(name = "olap_auto_gen", sequenceName = "olap_id_seq")
	@Column(name = "id", nullable = false)
	private Long id;

	@NotNull
	@Column(name = "daterange", nullable = false)
	private DateRange dateRange;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar timestamp;

	@NotNull
	@Column(name = "profit", nullable = false)
	private Double[] profit;

	@NotNull
	@Column(name = "turnover", nullable = false)
	private Double[] turnover;

	@NotNull
	@Column(name = "leads", nullable = false)
	private Double[] leads;

	@NotNull
	@Column(name = "offers", nullable = false)
	private Double[] offers;

	@NotNull	
	@Column(name = "sales", nullable = false)
	private Double[] sales;

	@NotNull
	@Column(name = "products")
	private ProductStatistic[] products;

	@NotNull
	@Column(name = "users")
	private UserStatistic[] users;

	public OLAP() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DateRange getDateRange() {
		return dateRange;
	}

	public void setDateRange(DateRange dateRange) {
		this.dateRange = dateRange;
	}

	public Calendar getTimeStamp() {
		return timestamp;
	}

	public void setTimeStamp(Calendar timeStamp) {
		this.timestamp = timeStamp;
	}

	public Calendar getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Calendar timestamp) {
		this.timestamp = timestamp;
	}

	public Double[] getProfit() {
		return profit;
	}

	public void setProfit(Double[] profit) {
		this.profit = profit;
	}

	public Double[] getTurnover() {
		return turnover;
	}

	public void setTurnover(Double[] turnover) {
		this.turnover = turnover;
	}

	public Double[] getLeads() {
		return leads;
	}

	public void setLeads(Double[] leads) {
		this.leads = leads;
	}

	public Double[] getOffers() {
		return offers;
	}

	public void setOffers(Double[] offers) {
		this.offers = offers;
	}

	public Double[] getSales() {
		return sales;
	}

	public void setSales(Double[] sales) {
		this.sales = sales;
	}

	public ProductStatistic[] getProducts() {
		return products;
	}

	public void setProducts(ProductStatistic[] products) {
		this.products = products;
	}

	public UserStatistic[] getUsers() {
		return users;
	}

	public void setUsers(UserStatistic[] users) {
		this.users = users;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dateRange == null) ? 0 : dateRange.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((leads == null) ? 0 : leads.hashCode());
		result = prime * result + ((offers == null) ? 0 : offers.hashCode());
		result = prime * result + ((products == null) ? 0 : products.hashCode());
		result = prime * result + ((profit == null) ? 0 : profit.hashCode());
		result = prime * result + ((sales == null) ? 0 : sales.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		result = prime * result + ((turnover == null) ? 0 : turnover.hashCode());
		result = prime * result + ((users == null) ? 0 : users.hashCode());
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
		OLAP other = (OLAP) obj;
		if (dateRange != other.dateRange)
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (leads == null) {
			if (other.leads != null)
				return false;
		} else if (!leads.equals(other.leads))
			return false;
		if (offers == null) {
			if (other.offers != null)
				return false;
		} else if (!offers.equals(other.offers))
			return false;
		if (products == null) {
			if (other.products != null)
				return false;
		} else if (!products.equals(other.products))
			return false;
		if (profit == null) {
			if (other.profit != null)
				return false;
		} else if (!profit.equals(other.profit))
			return false;
		if (sales == null) {
			if (other.sales != null)
				return false;
		} else if (!sales.equals(other.sales))
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		if (turnover == null) {
			if (other.turnover != null)
				return false;
		} else if (!turnover.equals(other.turnover))
			return false;
		if (users == null) {
			if (other.users != null)
				return false;
		} else if (!users.equals(other.users))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "OLAP [id=" + id + ", dateRange=" + dateRange + ", timestamp=" + timestamp + ", profit=" + profit
				+ ", turnover=" + turnover + ", leads=" + leads + ", offers=" + offers + ", sales=" + sales
				+ ", products=" + products + ", users=" + users + "]";
	}

}
