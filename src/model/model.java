package model;

import java.util.ArrayList;

import bean.AddressBean;
import bean.BookBean;
import bean.POBean;
import bean.AccountBean;
import dao.AddressDAO;
import dao.BookDAO;
import dao.PODAO;
import dao.AccountDAO;
import dao.POItemDAO;

public class model {

	private AddressDAO addressInfo;
	private BookDAO bookInfo;
	private PODAO poInfo;
	private AccountDAO accountInfo;
	private POItemDAO poItemInfo;

	public model() throws ClassNotFoundException {
		addressInfo = new AddressDAO();
		bookInfo = new BookDAO();
		poInfo = new PODAO();
		accountInfo = new AccountDAO();
		poItemInfo = new POItemDAO();

	}

	/////////////////////////////////////////////////////////////////////////
	// ADDRESS DB //
	public ArrayList<AddressBean> retrieveAddress(String id) throws Exception {
		return addressInfo.retrieveAddressUsingID(id);

	}

	public int addAddress(String street, String prov, String country, String post, String phone) throws Exception {
		return addressInfo.addAddress(street, prov, country, post, phone);
	}
	// END OF ADDRESS DB COMMANDS //
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// BOOK DB //
	//// returns BookBean that matches the bid provided
	public BookBean retrieveSingleBook(String bid) throws Exception {
		return bookInfo.retrieveAnyBookOrBooks(bid, "", null).get(0);
	}

	// returns arraylist of POBean that has all books
	public ArrayList<BookBean> retrieveAllBooks() throws Exception {
		return bookInfo.retrieveAnyBookOrBooks("", "", null);

	}

	// returns arraylist of BookBean that matches the category provided
	public ArrayList<BookBean> retrieveBookCat(String category) throws Exception {
		return bookInfo.retrieveAnyBookOrBooks("", category, null);
	}

	// returns arraylist of BookBean that matches the category provided
	public ArrayList<BookBean> retrieveShoppingCart(ArrayList<String> bids) throws Exception {
		return bookInfo.retrieveAnyBookOrBooks("", "", bids);
	}

	public ArrayList<BookBean> searchBooks(String search) throws Exception {
		return bookInfo.findBooks(search);
	}
	// END OF BOOK DB COMMANDS //
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// PO DB //
	// returns arraylist of POBean that matches the id provided
	public POBean retrieveSinglePO(String id) throws Exception {
		return poInfo.retrievePOUsingID(id).get(0);
	}

	// Adds the PO to the table and returns the id(number) of the PO added
	public int addPO(String lname, String fname, String status, String address) throws Exception {
		return poInfo.addPO(lname, fname, status, address);
	}
	// END OF PO DB COMMANDS //
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// ACCOUNT COMMANDS //
	// returns arraylist of POBean that matches the id provided
	public AccountBean createAccount(String username, String password, String street, String prov, String country,
			String post, String phone) throws Exception {

		return accountInfo.addAccount(username, password, addAddress(street, prov, country, post, phone));
	}

	// returns an account bean that holds the account Info(username and address)
	public AccountBean login(String username, String password) throws Exception {
		return accountInfo.verifyAccount(username, password);
	}
	// END OF ACCOUNT COMMANDS //
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// POItem COMMANDS //
	// Added an item to the POITEM table and r	eturn true if sucessful 
	public boolean addItemsToPO(int id, ArrayList<String> bids, double price) throws Exception {
		
		for(String bid : bids) {
			poItemInfo.addItemToPO(id, bid, price);
		}
		return true;
	}
	// END OF POITEM COMMANDS //
	/////////////////////////////////////////////////////////////////////////

}
