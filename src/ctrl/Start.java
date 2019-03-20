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

		/*make this map represent the books returned by category.
		 * Science
		 * Fiction
		 * Engineering
		 */
		HashMap<Integer, String> out = new HashMap<Integer, String> () {{
			put(1, "book1");
			put(2, "book2");
			put(3, "maybe");
		}};

		HashMap<Integer, ArrayList<String>> bookInfo = new HashMap<Integer, ArrayList<String>> () {{
			ArrayList<String> temp = new ArrayList<String> ();
			temp.addAll(Arrays.asList("$69", "5/7", "building memes"));
			put(1, (ArrayList<String>) temp.clone());
			temp.clear();
			temp.addAll(Arrays.asList("$101", "10/1", "this one is for you Vlad"));
			put(2, (ArrayList<String>) temp.clone());
			temp.clear();
			temp.addAll(Arrays.asList("$0.5", "0/100", "The Diaries of Ostroff and Jack"));
			put(3, (ArrayList<String>) temp.clone());
		}};
		
		System.out.println(request.getParameter("bookCategories")); //get the category that was selected by the user
		System.out.println(request.getParameter("bookChosen"));

		String cat = request.getParameter("bookCategories");
		String bookId = request.getParameter("bookChosen");
		
		HashMap<Integer, ArrayList<String>> bookReviews = new HashMap<Integer, ArrayList<String>>();
		if (request.getParameter("review") != null && request.getParameter("bookReview") != "" && bookId != null) {
			System.out.println(request.getParameter("bookReview"));
			ArrayList<String> temp = bookReviews.getOrDefault(Integer.parseInt(bookId), new ArrayList<String>());
			temp.add(request.getParameter("bookReview"));
			bookReviews.put(Integer.parseInt(request.getParameter("bookChosen")), temp);
		}

		
		if (bookId != null) {
			request.setAttribute("previousSelectedBook", out.get(Integer.parseInt(bookId)));
		}
		else request.setAttribute("previousSelectedBook", "Click Here");
		
		request.setAttribute("books_by_cat", out);
		request.setAttribute("previousSelectedCat", cat);
		request.setAttribute("catChosen", request.getParameter("bookCategories")!=null);

		request.setAttribute("bookInfo", bookInfo);
		request.setAttribute("previousSelectedCat", cat);
		
		request.setAttribute("oldBookId", bookId);
		
		request.setAttribute("bkChosen", request.getParameter("bookChosen")!=null);

		request.getRequestDispatcher("/MainPage.jspx").forward(request,response);
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
