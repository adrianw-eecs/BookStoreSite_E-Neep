package dao;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

import javax.naming.InitialContext;
import javax.naming.NamingException;

import bean.AddressBean;
import bean.POItemBean;

public class POItemDAO {

	private DataSource ds;

	public POItemDAO() throws ClassNotFoundException {
		try {
			ds = (DataSource) (new InitialContext()).lookup("java:/comp/env/jdbc/EECS");
		} catch (NamingException e) {
			e.printStackTrace();
		}

	}

	public boolean addItemToPO(int id, String bid, double price) throws SQLException {
		String query = "INSERT INTO POItem (id, bid, price) VALUES (?,?,?)";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setInt(1, id);
			sanatizedQuery.setString(2, bid);
			sanatizedQuery.setDouble(3, price);

			sanatizedQuery.executeUpdate();
		} catch (SQLException e) {
			throw new SQLException("Create POItem in POItemDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return true;
	}

	public String[] topTen() throws SQLException{
		String[] results = null;
		String query = "Select bid, count(bid) as quantity FROM POITEM group by bid";

		try {
			Connection con = this.ds.getConnection();
			PreparedStatement sanatizedQuery = con.prepareStatement(query);
			ResultSet r = sanatizedQuery.executeQuery();
			int i = 0;
			while (r.next()) {
				int result_quantity = r.getInt("QUANTITY");
				String result_bid = r.getString("BID");
				// CHANGE Querey for the current credits
				results[i] = result_bid + "|" + result_quantity;
				i++;
				sanatizedQuery.close();
				con.close();
			}
		} catch (SQLException e) {
			throw new SQLException("Analytics query failed");
		}

		
		return results;
	}

}
