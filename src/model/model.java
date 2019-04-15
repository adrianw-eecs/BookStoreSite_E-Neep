package model;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;

import bean.AccountBean;
import bean.AddressBean;
import bean.BookBean;
import bean.POBean;
import dao.AccountDAO;
import dao.AddressDAO;
import dao.BookDAO;
import dao.PODAO;
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
	public AddressBean retrieveAddress(String id) throws Exception {
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
	/**
	 * This method retrieves the book from the database by the book ID. Throws
	 * respective exceptions if anything is wrong.
	 * 
	 * @param bid book ID of the book in the database
	 * @return ArrayList of Strings containing the title and the price of the book
	 *         in String format
	 * @throws SQLException is thrown if there is something wrong on the database
	 *                      end in DAO
	 * @throws Exception    is thrown in case if there is something wrong with the
	 *                      retrieved results from the database - i.e. if one the
	 *                      fields is empy or null
	 */
	public ArrayList<String> retrieveSingleBook(String bid) throws SQLException, Exception {
		ArrayList<String> queryResult = new ArrayList<String>();
		BookBean retrievedBook = bookInfo.retrieveAnyBookOrBooks(bid, "", null).get(0);

		if (retrievedBook.getBid().equals("")) {
			System.out.println(
					"The system returned a book with an empty ID. There was something wrong, please try again");
			throw new Exception("");
		}
		if (retrievedBook.getTitle().equals("")) {
			System.out.println(
					"The system returned a book with an empty Name. There was something wrong, please try again");
			throw new Exception("");
		}
		if (retrievedBook.getCategory().equals("")) {
			System.out.println(
					"The system returned a book with an empty Category. There was something wrong, please try again");
			throw new Exception("");
		}
		if (retrievedBook.getPrice() == 0) {
			System.out.println(
					"The system returned a book with a price of $0. There was something wrong, please try again");
			throw new Exception("");
		}

		queryResult.add(retrievedBook.getTitle());
		queryResult.add(String.valueOf(retrievedBook.getPrice()));

		return queryResult;
	}

	public BookBean retrieveSingleBookBOOKBEAN(String bid) throws SQLException, Exception {
		return bookInfo.retrieveAnyBookOrBooks(bid, "", null).get(0);
	}

	// returns arraylist of POBean that has all books
	public ArrayList<BookBean> retrieveAllBooks() throws Exception {
		return bookInfo.retrieveAnyBookOrBooks("", "", null);

	}

	//
	/**
	 * This method returns an arrayList of BookBeans that matches the category
	 * provided from the Controller
	 * 
	 * 
	 * @param category category, by which the books are to be retrieved from the
	 *                 database
	 * @return ArrayList populated BookBeans or thrown an Exception if empty
	 * @throws SQLException this exception is thrown in case if there is a database
	 *                      error coming in from BookDAO
	 * @throws Exception    this exception is thrown in case if the resulting
	 *                      ArrayList turns out to be empty with no BookBeans
	 */
	public HashMap<String, String> retrieveBookCat(String category) throws SQLException, Exception {
		HashMap<String, String> queryResult = new HashMap<String, String>();
		ArrayList<BookBean> booksByCategory = bookInfo.retrieveAnyBookOrBooks("", category, null);

		if (checkResultArraySize(booksByCategory)) {
			System.out.println(
					"The query results came out empty. Please choose another category of books and try again.");
			throw new Exception("");
		}

		for (BookBean b : booksByCategory) {
			queryResult.put(b.getBid(), b.getTitle());

		}

		return queryResult;

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

	/**
	 * Check if the query return an empty array of BookBeans
	 * 
	 * @param queryArray the ArrayList containing the BookBeans returned by the
	 *                   query
	 * @return true if the resulting Array is empty, false otherwise
	 */
	private boolean checkResultArraySize(ArrayList<BookBean> queryArray) {
		return queryArray.isEmpty();
	}

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
			String post, String phone, Boolean admin, String fname, String lname) throws Exception {

		return accountInfo.addAccount(username, password, addAddress(street, prov, country, post, phone), admin, fname, lname);
	}

	// returns an account bean that holds the account Info(username and address)
	public AccountBean login(String username, String password) throws Exception {
		return accountInfo.verifyAccount(username, password);
	}
	
	// returns an account bean that holds the account Info(username and address)
	public boolean adminlogin(String username, String password) throws Exception {
		return accountInfo.verifyAdminAccount(username, password);
	}

	/**
	 * Method that checks if the user name is taken or not
	 * 
	 * @param username the username to be verified
	 * @return empty String if the username does not exist, otherwise, return the
	 *         username from the database
	 * @throws SQLException exception is thrown in case of some errors on DAO level
	 */
	public String checkUserName(String username) throws SQLException {
		String result = accountInfo.verifyUserName(username);
		return result;
	}
	// END OF ACCOUNT COMMANDS //
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// POItem COMMANDS //
	// Added an item to the POITEM table and return true if sucessful
	public boolean addItemsToPO(int id, String bids, double price) throws Exception {
			poItemInfo.addItemToPO(id, bids, price, Calendar.getInstance().get(Calendar.MONTH));
		return true;
	}
	
	public String[] analyticsTopTen( ) throws SQLException {
		return poItemInfo.topTen();
	}
	
	public String[] analyticsSalesMonth(int month) throws SQLException {
		return poItemInfo.perMonth(month);
	}
	// END OF POITEM COMMANDS //
	/////////////////////////////////////////////////////////////////////////

}
