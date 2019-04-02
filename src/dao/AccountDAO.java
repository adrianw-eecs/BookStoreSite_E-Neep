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
				String result_name = r.getString("USERNAME");
				int result_addr_id = r.getInt("ADDRESS");
				// CHANGE Querey for the current credits
				account = new AccountBean(result_name, result_addr_id);
			}
		} catch (SQLException e) {
			System.out.println("Verification in AccountDAO failed");
			throw new SQLException(e.getMessage());
		}

		sanatizedQuery.close();
		con.close();
		return account;
	}

	public AccountBean addAccount(String username, String password, int address) throws SQLException {
		AccountBean acc = null;
		String query = "INSERT INTO ACCOUNT (username, password, address) VALUES (?,?,?)";
		Connection con = this.ds.getConnection();
		PreparedStatement sanatizedQuery = con.prepareStatement(query);
		try {
			sanatizedQuery.setString(1, username);
			sanatizedQuery.setString(2, password);
			sanatizedQuery.setInt(3, address);

			sanatizedQuery.executeUpdate();

			acc = new AccountBean(username, address);

		} catch (SQLException e) {
			System.out.println("Create account in AccountDAO failed");
			throw new SQLException(e.getMessage());
		}

		sanatizedQuery.close();
		con.close();
		return acc;
	}

}
