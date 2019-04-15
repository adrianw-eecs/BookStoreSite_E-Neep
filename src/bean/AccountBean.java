package bean;

public class AccountBean {

	private String username;
	private int address;
	private boolean admin;
	private String fname;
	private String lname;

	public AccountBean(String username, int address, boolean admin, String fname, String lname) {
		this.username = username;
		this.address = address;
		this.admin = admin;
		this.fname = fname;
		this.lname = lname;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAddress() {
		return this.address + "";
	}

	public void setAddress(int address) {
		this.address = address;
	}

}
