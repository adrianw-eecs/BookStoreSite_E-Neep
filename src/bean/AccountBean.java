package bean;

public class AccountBean {
	
	private String username;
//	private String password;
	private int address;
	
//	public AccountBean(int id, String username, String password, int address) {
	public AccountBean(String username, int address) {
		this.username = username;
//		this.password = password;
		this.address = address;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}
	public int getAddress() {
		return address;
	}
	public void setAddress(int address) {
		this.address = address;
	} 

}
