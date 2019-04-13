package webServices;

import bean.BookBean;
import model.model;

public class GetProductInfo {
	private model theModel;

	public GetProductInfo() throws ClassNotFoundException {
		theModel = new model();
	}

	public BookBean getProductInfoSOAP(String bid) {
		try {
			return theModel.retrieveSingleBookBOOKBEAN(bid);
		} catch (Exception e) {
			System.out.println("SOAP Failed");
			return null;
		}
	}

}
