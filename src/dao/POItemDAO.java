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
			System.out.println("Create POItem in POItemDAO failed");
			throw new SQLException(e.getMessage());
		}

		sanatizedQuery.close();
		con.close();
		return true;
	}

}
