package bean;

import javax.xml.bind.annotation.*;

@XmlRootElement(name = "sisReport")
@XmlAccessorType(XmlAccessType.FIELD)
public class BookBean {

	@XmlElement(name = "bid")
	private String bid;
	@XmlElement(name = "title")
	private String title;
	@XmlElement(name = "price")
	private double price;
	@XmlElement(name = "category")
	private String category;

	public BookBean(String bid, String title, double price, String category) {
		this.bid = bid;
		this.title = title;
		this.price = price;
		this.category = category;
	}

	public BookBean() {
		this.bid = "";
		this.title = "";
		this.price = 0.00;
		this.category = "";
	}

	public String getBid() {
		return bid;
	}

	public void setBid(String bid) {
		this.bid = bid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String[] toStringArray() {
		String[] stringArray = new String[4];
		stringArray[0] = this.bid;
		stringArray[1] = this.title;
		stringArray[2] = Double.toString(this.price);
		stringArray[3] = this.category;
		return stringArray;

	}
}
