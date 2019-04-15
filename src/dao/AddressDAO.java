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

public class AddressDAO {

	private DataSource ds;

	public AddressDAO() throws ClassNotFoundException {
		try {
			ds = (DataSource) (new InitialContext()).lookup("java:/comp/env/jdbc/EECS");
		} catch (NamingException e) {
			System.out.println(e.getMessage());
		}

	}

	public AddressBean retrieveAddressUsingID(String id) throws SQLException {
		String query = "Select * FROM ADDRESS WHERE ID = ?";
		AddressBean person = null;
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setInt(1, Integer.parseInt(id));
			ResultSet r = sanatizedQuery.executeQuery();
			while (r.next()) {
				int result_id = r.getInt("ID");
				String result_street = r.getString("STREET");
				String result_province = r.getString("PROVINCE");
				String result_country = r.getString("COUNTRY");
				String result_zip = r.getString("ZIP");
				String result_phone = r.getString("PHONE");

				person = new AddressBean(result_id, result_street, result_province, result_country, result_zip,
						result_phone);

			}
		} catch (SQLException e) {
			throw new SQLException("Query in AddressDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return person;
	}

	public int addAddress(String street, String prov, String country, String post, String phone) throws SQLException {

		int id = getID() + 1;
		String query = "INSERT INTO Address (id, street, province, country, zip, phone) VALUES (?,?,?,?,?,?)";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setInt(1, id);
			sanatizedQuery.setString(2, street);
			sanatizedQuery.setString(3, prov);
			sanatizedQuery.setString(4, country);
			sanatizedQuery.setString(5, post);
			sanatizedQuery.setString(6, phone);

			sanatizedQuery.executeUpdate();

		} catch (SQLException e) {
			throw new SQLException("Update in AddressDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return id;
	}

	private int getID() throws SQLException {

		String query = "Select MAX(id) as ID from ADDRESS";
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
			throw new SQLException("Failed to get ID in AddressDAO");
		}

	}

}
