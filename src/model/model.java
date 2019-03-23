package model;

import java.util.ArrayList;

import bean.AddressBean;
import bean.BookBean;
import dao.AddressDAO;
import dao.BookDAO;

public class model {
	
	private AddressDAO addressinfo;
	private BookDAO bookinfo;
	
	public model() throws ClassNotFoundException {
		addressinfo = new AddressDAO();
		bookinfo = new BookDAO();

	}

	public ArrayList<AddressBean> retrieveAddress(String id) throws Exception{
		return addressinfo.retrieveAddressUsingID(id);
	}
	
	public ArrayList<BookBean> retrieveSingleBook(String bid) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks(bid, "", null);
	}
	
	public ArrayList<BookBean> retrieveBookCat(String category) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks("", category, null);
	}
	
	public ArrayList<BookBean> retrieveShoppingCart(ArrayList<String> bids) throws Exception{
		return bookinfo.retrieveAnyBookOrBooks("", "", bids);
	}

	public ArrayList<BookBean> searchBooks(String search) throws Exception{
		return bookinfo.findBooks(search);
	}
	
}
