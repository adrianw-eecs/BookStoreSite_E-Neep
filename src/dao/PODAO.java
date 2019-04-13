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

import bean.POBean;

public class PODAO {

	private DataSource ds;

	public PODAO() throws ClassNotFoundException {
		try {
			ds = (DataSource) (new InitialContext()).lookup("java:/comp/env/jdbc/EECS");
		} catch (NamingException e) {
			e.printStackTrace();
		}

	}

	public ArrayList<POBean> retrievePOUsingID(String id) throws SQLException {
		String query = "Select * FROM PO WHERE ID = ?";
		ArrayList<POBean> arraylist = new ArrayList<POBean>();
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setInt(1, Integer.parseInt(id));
			ResultSet r = sanatizedQuery.executeQuery();
			while (r.next()) {
				int result_id = r.getInt("ID");
				String result_lname = r.getString("LNAME");
				String result_fname = r.getString("FNAME");
				String result_status = r.getString("STATUS");
				int result_addr = r.getInt("ADDRESS");
				POBean po = new POBean(result_id, result_lname, result_fname, result_status, result_addr);
				arraylist.add(po);
			}
		} catch (SQLException e) {
			throw new SQLException("Failed to retrieve PO form DB");
		}

		sanatizedQuery.close();
		con.close();
		return arraylist;
	}

	public int addPO(String lname, String fname, String status, String address) throws SQLException {

		int id = getID() + 1;
		String query = "INSERT INTO PO (id, lname, fname, status, address) VALUES (?,?,?,?,?)";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setInt(1, id);
			sanatizedQuery.setString(2, lname);
			sanatizedQuery.setString(3, fname);
			sanatizedQuery.setString(4, status);
			sanatizedQuery.setString(5, address);

			sanatizedQuery.executeUpdate();

		} catch (SQLException e) {
			throw new SQLException("Failed to create PO");
		}

		sanatizedQuery.close();
		con.close();
		return id;
	}

	private int getID() throws SQLException {

		String query = "Select MAX(id) as ID from PO";
		try {
			Connection con = this.ds.getConnection();
			PreparedStatement sanatizedQuery = con.prepareStatement(query);
			ResultSet r = sanatizedQuery.executeQuery();
			r.next();
			int result_id = r.getInt("ID");
			sanatizedQuery.close();
			con.close();
			return result_id;
		} catch (SQLException e) {
			throw new SQLException("Failed to get POID");
		}
	}

}
