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

import bean.AccountBean;

public class AccountDAO {

	private DataSource ds;

	public AccountDAO() throws ClassNotFoundException {
		try {
			ds = (DataSource) (new InitialContext()).lookup("java:/comp/env/jdbc/EECS");
		} catch (NamingException e) {
			e.printStackTrace();
		}

	}

	/**
	 * Method that checks the database if the given username exists already or not
	 * 
	 * @param username the username to check
	 * @return empty String if username does not exist, or the username itself, if it exists
	 * @throws SQLException in case if there was some problem with the database
	 */
	public String verifyUserName(String username) throws SQLException {

		String query = "SELECT * FROM ACCOUNT WHERE USERNAME = ?";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);

		String userName = "";
		try {
			sanatizedQuery.setString(1, username);

			ResultSet r = sanatizedQuery.executeQuery();
			if (r.next()) {
				userName = r.getString("USERNAME");
			}
		} catch (SQLException e) {

			throw new SQLException("Verification in AccountDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return userName;
	}

	public AccountBean verifyAccount(String username, String password) throws SQLException {

		AccountBean account = null;
		String query = "SELECT * FROM ACCOUNT WHERE USERNAME = ? and PASSWORD = ?";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setString(1, username);
			sanatizedQuery.setString(2, password);

			ResultSet r = sanatizedQuery.executeQuery();
			if (r.next()) {
				String result_uname = r.getString("USERNAME");
				int result_addr_id = r.getInt("ADDRESS");
				boolean result_admin = r.getBoolean("ADMIN");
				String result_fname = r.getString("FNAME");
				String result_lname = r.getString("LNAME");
				// CHANGE Querey for the current credits
				account = new AccountBean(result_uname, result_addr_id, result_admin, result_fname, result_lname);
			}
		} catch (SQLException e) {
			throw new SQLException("Verification in AccountDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return account;
	}

	public AccountBean addAccount(String username, String password, int address, boolean admin, String fname, String lname) throws SQLException {
		AccountBean acc = null;
		String query = "INSERT INTO ACCOUNT (username, password, address, admin, fname, lname) VALUES (?,?,?,?,?,?)";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setString(1, username);
			sanatizedQuery.setString(2, password);
			sanatizedQuery.setInt(3, address);
			sanatizedQuery.setBoolean(4, admin);
			sanatizedQuery.setString(5, fname);
			sanatizedQuery.setString(6, lname);
			sanatizedQuery.executeUpdate();

			acc = new AccountBean(username, address, admin, fname, lname);

		} catch (SQLException e) {
//			System.out.println("Create account in AccountDAO failed");
			throw new SQLException("Create account in AccountDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return acc;
	}

	public boolean verifyAdminAccount(String username, String password) throws SQLException {
		AccountBean account = null;
		String query = "SELECT * FROM ACCOUNT WHERE USERNAME = ? and PASSWORD = ?";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setString(1, username);
			sanatizedQuery.setString(2, password);

			ResultSet r = sanatizedQuery.executeQuery();
			if (r.next()) {
				String result_name = r.getString("USERNAME");
				int result_addr_id = r.getInt("ADDRESS");
				boolean result_admin = r.getBoolean("ADMIN");
				// CHANGE Query for the current credits
				return result_admin;
			}
		} catch (SQLException e) {
//			System.out.println("Verification in AccountDAO failed");
			throw new SQLException("Verification in AccountDAO failed");
		}

		sanatizedQuery.close();
		con.close();
		return false;
	}

}
