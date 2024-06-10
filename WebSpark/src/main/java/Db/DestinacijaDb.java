package Db;
import Entiteti.Destinacija;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DestinacijaDb {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/turisticki_vodic";
    private final String jdbcUsername = "root";
    private final String jdbcPassword = "root";

    private static final String INSERT_DESTINACIJA_SQL = "INSERT INTO destinacija (ime, opis) VALUES (?, ?)";
    private static final String SELECT_DESTINACIJA_BY_ID = "SELECT id, ime, opis FROM destinacija WHERE id = ?";
    private static final String SELECT_ALL_DESTINACIJA = "SELECT * FROM destinacija";
    private static final String DELETE_DESTINACIJA_SQL = "DELETE FROM destinacija WHERE id = ?";
    private static final String UPDATE_DESTINACIJA_SQL = "UPDATE destinacija SET ime = ?, opis = ? WHERE id = ?";

    private static final String SELECT_DESTINACIJA_BY_IME = "SELECT * FROM destinacija WHERE ime = ?";

    protected Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    public void insertDestinacija(Destinacija destinacija) throws SQLException {
        if (checkIfDestinacijaExists(destinacija.getIme())) {
            throw new SQLException("Destinacija s imenom '" + destinacija.getIme() + "' već postoji.");
        }

        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(INSERT_DESTINACIJA_SQL)) {
            preparedStatement.setString(1, destinacija.getIme());
            preparedStatement.setString(2, destinacija.getOpis());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            printSQLException(e);
        }
    }

    private boolean checkIfDestinacijaExists(String ime) throws SQLException {
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SELECT_DESTINACIJA_BY_IME)) {
            preparedStatement.setString(1, ime);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                return resultSet.next();
            }
        }
    }

    public Destinacija selectDestinacija(int id) {
        Destinacija destinacija = null;
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_DESTINACIJA_BY_ID)) {
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                String ime = rs.getString("ime");
                String opis = rs.getString("opis");
                destinacija = new Destinacija(id, ime, opis);
            }
        } catch (SQLException e) {
            printSQLException(e);
        }
        return destinacija;
    }

    public List<Destinacija> selectAllDestinacija() {
        List<Destinacija> destinacijaList = new ArrayList<>();
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_DESTINACIJA)) {
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String ime = rs.getString("ime");
                String opis = rs.getString("opis");
                destinacijaList.add(new Destinacija(id, ime, opis));
            }
        } catch (SQLException e) {
            printSQLException(e);
        }
        return destinacijaList;
    }

    public boolean deleteDestinacija(int id) throws SQLException {
        boolean rowDeleted;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(DELETE_DESTINACIJA_SQL)) {
            statement.setInt(1, id);
            rowDeleted = statement.executeUpdate() > 0;
        }
        return rowDeleted;
    }

    public boolean updateDestinacija(Destinacija destinacija) throws SQLException {
        boolean rowUpdated;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(UPDATE_DESTINACIJA_SQL)) {
            statement.setString(1, destinacija.getIme());
            statement.setString(2, destinacija.getOpis());
            statement.setInt(3, destinacija.getId());
            rowUpdated = statement.executeUpdate() > 0;
        }
        return rowUpdated;
    }

    private void printSQLException(SQLException ex) {
        for (Throwable e : ex) {
            if (e instanceof SQLException) {
                e.printStackTrace(System.err);
                System.err.println("SQLState: " + ((SQLException) e).getSQLState());
                System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
                System.err.println("Message: " + e.getMessage());
                Throwable t = ex.getCause();
                while (t != null) {
                    System.out.println("Cause: " + t);
                    t = t.getCause();
                }
            }
        }
    }
}
