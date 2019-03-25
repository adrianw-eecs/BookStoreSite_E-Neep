package model;

import java.util.ArrayList;

import bean.AddressBean;
import dao.AddressDAO;

public class model {
	
	private AddressDAO addressinfo;
	
	public model() throws ClassNotFoundException {
		addressinfo = new AddressDAO();

	}

	public ArrayList<AddressBean> retrieveAddress(String id) throws Exception{
		return addressinfo.retrieveAddressUsingID(id);
	}
}
