package model;

import java.util.ArrayList;

import bean.AddressBean;
import bean.BookBean;
import bean.POBean;
import dao.AddressDAO;
import dao.BookDAO;
import dao.PODAO;

public class model {
	
	private AddressDAO addressinfo;
	private BookDAO bookinfo;
	private PODAO poinfo;
	
	public model() throws ClassNotFoundException {
		addressinfo = new AddressDAO();
		bookinfo = new BookDAO();
		poinfo = new PODAO();

	}
	/////////////////////////////////////////////////////////////////////////
	// ADDRESS DB														   //
	public ArrayList<AddressBean> retrieveAddress(String id) throws Exception{
		return addressinfo.retrieveAddressUsingID(id);

	}
	public int addAddress(String street, String prov, String country, String post, String phone) throws Exception{
		return addressinfo.addAddress(street, prov, country, post, phone);
	}
	// END OF ADDRESS DB COMMANDS										   //
	/////////////////////////////////////////////////////////////////////////
	
	
	/////////////////////////////////////////////////////////////////////////
	// BOOK DB														   	   //
	//// returns BookBean that matches the bid provided 
	public BookBean retrieveSingleBook(String bid) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks(bid, "", null).get(0);
	}
	
	// returns arraylist of POBean that has all books
	public ArrayList<BookBean> retrieveAllBooks() throws Exception{
		return bookinfo.retrieveAnyBookOrBooks("", "", null);

	}
	
	// returns arraylist of BookBean that matches the category provided 
	public ArrayList<BookBean> retrieveBookCat(String category) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks("", category, null);
	}
	
	// returns arraylist of BookBean that matches the category provided 
	public ArrayList<BookBean> retrieveShoppingCart(ArrayList<String> bids) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks("", "", bids);
	}

	public ArrayList<BookBean> searchBooks(String search) throws Exception{
		return bookinfo.findBooks(search);
	}
	// END OF BOOK DB COMMANDS											   //
	/////////////////////////////////////////////////////////////////////////
	
	/////////////////////////////////////////////////////////////////////////
	// ADDRESS PO														   //
	// returns arraylist of POBean that matches the id provided 
	public POBean retrieveSinglePO(String id) throws Exception{
	return poinfo.retrievePOUsingID(id).get(0);
	}
	
	//Adds the PO to the table and returns the id(number) of the PO added
	public int addPO(String lname, String fname, String status, String address) throws Exception{
	return poinfo.addPO(lname, fname, status, address);
	}
	// END OF PO DB COMMANDS										   //
	/////////////////////////////////////////////////////////////////////////
	
}
