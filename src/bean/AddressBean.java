package bean;

public class AddressBean {
	
	private int id;
	private String street;
	private String province;
	private String country;
	private String zip;
	private String telephone;
	
	public AddressBean(int id, String street, String province, String country, String zip, String telephone) {
		this.id = id;
		this.street = street;
		this.province = province;
		this.country = country;
		this.zip = zip;
		this.telephone = telephone;
	}
	
	public AddressBean() {
		this.id = 0;
		this.street = "";
		this.province = "";
		this.country = "";
		this.zip = "";
		this.telephone = "000000000";
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
}
