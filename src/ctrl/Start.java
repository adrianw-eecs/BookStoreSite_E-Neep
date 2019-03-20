package ctrl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Start
 */
@WebServlet("/Start")
public class Start extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Start() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		/*This map represents all the books that have the category chosen by the user.
		 * Category is one of the following
		 * Science
		 * Fiction
		 * Engineering
		 */
		HashMap<Integer, String> out = new HashMap<Integer, String> () {{
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
		HashMap<Integer, ArrayList<String>> bookInfo = new HashMap<Integer, ArrayList<String>> () {{
			ArrayList<String> temp = new ArrayList<String> ();
			temp.addAll(Arrays.asList("building memes", "$69", "5/7"));
			//cloning done to avoid reference overwrite for multiple books.
			//for the actual implementation, we don't need these as there will only be one choice for the book and it's information
			//this is for representation purposes
			put(1, (ArrayList<String>) temp.clone()); 
			temp.clear();
			temp.addAll(Arrays.asList("this one is for you Vlad", "$101", "10/1"));
			put(2, (ArrayList<String>) temp.clone());
			temp.clear();
			temp.addAll(Arrays.asList("The Diaries of Ostroff and Jack", "$0.5", "0/100"));
			put(3, (ArrayList<String>) temp.clone());
		}};
		
		//debugging print statements
		System.out.println(request.getParameter("bookCategories")); //get the category that was selected by the user
		System.out.println(request.getParameter("bookChosen")); //get the book that was chosen by the user
		
		/*
		 * using one category for the whole session until the user decides to change it
		 */
		String cat = request.getParameter("bookCategories");
		
		/*
		 * using one bookId for the session until the user changes it
		 */
		String bookId = request.getParameter("bookChosen");
		
		
		/*
		 * bookReviews keeps track of all the reviews that were submitted on a particular book (with Id)
		 * just keep appending reviews to the end and then saving them
		 * 
		 * I don't know what to do with the reviews but we're saving it for later
		 */
		HashMap<Integer, ArrayList<String>> bookReviews = new HashMap<Integer, ArrayList<String>>();
		if (request.getParameter("review") != null && request.getParameter("bookReview") != "" && bookId != null) {
			System.out.println(request.getParameter("bookReview"));
			ArrayList<String> temp = bookReviews.getOrDefault(Integer.parseInt(bookId), new ArrayList<String>());
			temp.add(request.getParameter("bookReview"));
			bookReviews.put(Integer.parseInt(request.getParameter("bookChosen")), temp);
		}

		
		/*
		 * this is here to make sure that the value for the Book Title is what the user picked everytime
		 * otherwise it has the default message "Click Here"
		 */
		if (bookId != null) {
			request.setAttribute("previousSelectedBook", out.get(Integer.parseInt(bookId)));
		}
		else request.setAttribute("previousSelectedBook", "Click Here");
		
		
		request.setAttribute("books_by_cat", out); //setting the books that have the chosen category to requestScope
		request.setAttribute("previousSelectedCat", cat); //keep track of the category for the whole session (or until it's changed)
		request.setAttribute("catChosen", request.getParameter("bookCategories") != null); //boolean to show if a category has already been chosen

		request.setAttribute("bookInfo", bookInfo); //setting the map to the requestScope to make the table of the book, category and its inormation
		
		request.setAttribute("oldBookId", bookId); //keeping track of the chosen book ID to use for the current requestScope
		
		request.setAttribute("bkChosen", request.getParameter("bookChosen")!=null); //boolean to represent that a book has been chosen to make the table

		request.getRequestDispatcher("/MainPage.jspx").forward(request,response); //always redirect to the main bookstore page
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
