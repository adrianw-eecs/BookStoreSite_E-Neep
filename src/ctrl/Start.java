package ctrl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bean.BookBean;
import model.model;

/**
 * Servlet implementation class Start
 */
@WebServlet({"/Start", "/Start/*"})
public class Start extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private model theModel;
	HashMap<Integer, ArrayList<String>> bookReviews = new HashMap<Integer, ArrayList<String>>();
	ArrayList<String> shoppingCart = new ArrayList<String>();
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Start() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void init() throws ServletException {
		ServletContext context = getServletContext();
		try {
			theModel = new model();
			context.setAttribute("model", theModel);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("Excpetion has occured");
		}

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub


		
		/// For the purposes of testing Adrians Part

		try {
			theModel.retrieveAddress("1");
			theModel.retrieveSingleBook("b002");
			theModel.retrieveBookCat("Engineering");
			ArrayList<String> bids = new ArrayList<String>();
			bids.add("b002");
			bids.add("b003");
			ArrayList<BookBean> data = theModel.retrieveShoppingCart(bids);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		/*
		 * Map containing bid -> quantity to be rerouted to response
		 */
		ArrayList<ArrayList<String>> scInfo = new ArrayList<ArrayList<String>>();
		
		scInfo.add(new ArrayList<String> (
				Arrays.asList("1", "3", "69")
				));
		scInfo.add(new ArrayList<String> (
				Arrays.asList("2", "4", "0.99")
				));
		scInfo.add(new ArrayList<String> (
				Arrays.asList("3", "1", "999")
				));
		
		
		/*This map represents all the books that have the category chosen by the user.
		 * Category is one of the following
		 * Science
		 * Fiction
		 * Engineering
		 */

		HashMap<Integer, String> outMap = new HashMap<Integer, String> () {{

			put(1, "book1");
			put(2, "book2");
			put(3, "maybe");
		}};

		/*
		 * bookInfo map that allows HTML access to all the information in the format
		 * title
		 * price
		 * rating
		 * as elements in an arraylist.
		 */
		ArrayList<String> bookInfo = new ArrayList<String> ( 
				Arrays.asList("1", "building memes", "5/7", "69")
				);
		
		

		System.out.println(request.getPathInfo() + " " + request.getQueryString());
		if (request.getPathInfo() != null && request.getPathInfo().contains("Ajax")) {
			System.out.println(bookReviews);
			System.out.println(shoppingCart);
			
			/*
			 * Information passed to front end of the following format:
			 * for one string (i.e. the information of one specific book) it is:
			 * 	Title | Rating | Price
			 * otherwise, for any arraylists it is:
			 * 	an array of strings with similar format as above. They should be comma-separated by default as arrays
			 */
			if (request.getParameter("category") != null) {
				String[] out = new String [outMap.size()];
				int i = 0;
				for (int k : outMap.keySet()) {
					out[i] = k + "|" + outMap.get(k);
					i++;
				}
				//System.out.println(Arrays.toString(out));
				response.getWriter().write(Arrays.toString(out));
			}else if (request.getParameter("bid") != null){
				String out = "";
				for (String k : bookInfo) {
					out += k + "|"; 
				}
				response.getWriter().write(out);
			}else if (request.getParameter("quantity") != null) {
				String[] out = new String [scInfo.size()];
				int i = 0;
				while (i < scInfo.size()) {
					out[i] = scInfo.get(i).toString().replaceAll(",", "|");
					i++;
				}
				response.getWriter().write(Arrays.toString(out));
			}


		}else if (request.getParameter("shoppingCart")!=null) {
			//when shopping cart button is clicked, we move to shopping cart page
			request.getRequestDispatcher("/ShoppingCart.jspx").forward(request,response);
		}else if (request.getParameter("checkOut")!=null) {
			//when check out button is clicked, we move to payment page
			request.getRequestDispatcher("/Payment.jspx").forward(request,response);
		}else {

			request.getRequestDispatcher("/MainPage.jspx").forward(request,response); //always redirect to the main bookstore page
			response.getWriter().append("Served at: ").append(request.getContextPath());

		}




	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		/*
		 * bookReviews keeps track of all the reviews that were submitted on a particular book (with Id)
		 * just keep appending reviews to the end and then saving them
		 * 
		 * I don't know what to do with the reviews but we're saving it for later
		 * 
		 */
		if (request.getParameter("review") != null){
			String bookId = request.getParameter("bid");
			ArrayList<String> temp = bookReviews.getOrDefault(Integer.parseInt(bookId), new ArrayList<String>());
			temp.add(request.getParameter("review"));
			bookReviews.put(Integer.parseInt(bookId), temp);
		}else if (request.getParameter("addBid") != null) {
			/*
			 * adding a bookId to the running shoppingCart list to play around with
			 */
			shoppingCart.add(request.getParameter("addBid"));
		}
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
