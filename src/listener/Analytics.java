package listener;

import java.util.Calendar;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import model.model;

/**
 * Application Lifecycle Listener implementation class Analytics
 *
 */
@WebListener
public class Analytics implements HttpSessionAttributeListener {

	private model theModel;
	private String[] topTen = null;
	private String[] allBooks = null;

	/**
	 * Default constructor.
	 */
	public Analytics() {
		// TODO Auto-generated constructor stub

	}

	/**
	 * @see HttpSessionAttributeListener#attributeAdded(HttpSessionBindingEvent)
	 */
	public void attributeAdded(HttpSessionBindingEvent arg0) {
		updatePopularBooks(arg0);
	}

	/**
	 * @see HttpSessionAttributeListener#attributeRemoved(HttpSessionBindingEvent)
	 */
	public void attributeRemoved(HttpSessionBindingEvent arg0) {
		updatePopularBooks(arg0);
	}

	/**
	 * @see HttpSessionAttributeListener#attributeReplaced(HttpSessionBindingEvent)
	 */
	public void attributeReplaced(HttpSessionBindingEvent arg0) {
		updatePopularBooks(arg0);
	}

	public void updatePopularBooks(HttpSessionBindingEvent arg0) {
		System.out.println("---" +arg0);
		if (arg0.getName().equals("purchaseFlag")) {
			theModel = (model) arg0.getSession().getServletContext().getAttribute("model");
			updateTopTenTable();
			updateAllBooks();

			arg0.getSession().setAttribute("topTen", topTen);
			arg0.getSession().setAttribute("allBooks", allBooks);
		}
	}

	private void updateTopTenTable() {
		try {
			topTen = theModel.analyticsTopTen();

		} catch (Exception e) {
			System.out.println("Failed to get top ten analytics");
		}
	}

	private void updateAllBooks() {
		try {
			allBooks = theModel.analyticsSalesMonth(Calendar.getInstance().get(Calendar.MONTH));
		} catch (Exception e) {
			System.out.println("Failed to get all books for the month analytics");
		}
	}

}
