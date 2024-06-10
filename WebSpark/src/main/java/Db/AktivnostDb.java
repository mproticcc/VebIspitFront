package Db;

import Entiteti.Aktivnost;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AktivnostDb {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/turisticki_vodic";
    private final String jdbcUsername = "root";
    private final String jdbcPassword = "root";

    private static final String INSERT_AKTIVNOST_SQL = "INSERT INTO aktivnost (naziv) VALUES (?)";
    private static final String SELECT_AKTIVNOST_BY_ID = "SELECT id, naziv FROM aktivnost WHERE id = ?";
    private static final String SELECT_ALL_AKTIVNOST = "SELECT * FROM aktivnost";
    private static final String DELETE_AKTIVNOST_SQL = "DELETE FROM aktivnost WHERE id = ?";
    private static final String UPDATE_AKTIVNOST_SQL = "UPDATE aktivnost SET naziv = ? WHERE id = ?";

    protected Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    public void insertAktivnost(Aktivnost aktivnost) throws SQLException {
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(INSERT_AKTIVNOST_SQL)) {
            preparedStatement.setString(1, aktivnost.getNaziv());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            printSQLException(e);
        }
    }

    public Aktivnost selectAktivnost(int id) {
        Aktivnost aktivnost = null;
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_AKTIVNOST_BY_ID)) {
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                String naziv = rs.getString("naziv");
                aktivnost = new Aktivnost(id, naziv);
            }
        } catch (SQLException e) {
            printSQLException(e);
        }
        return aktivnost;
    }

    public List<Aktivnost> selectAllAktivnost() {
        List<Aktivnost> aktivnostList = new ArrayList<>();
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_AKTIVNOST)) {
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String naziv = rs.getString("naziv");
                aktivnostList.add(new Aktivnost(id, naziv));
            }
        } catch (SQLException e) {
            printSQLException(e);
        }
        return aktivnostList;
    }

    public List<Aktivnost> selectAktivnostiByClanakId(int clanakId) {
        List<Aktivnost> aktivnosti = new ArrayList<>();
        String query = "SELECT a.id, a.naziv FROM aktivnost a " +
                "JOIN clanak_aktivnost ca ON a.id = ca.aktivnost_id " +
                "WHERE ca.clanak_id = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, clanakId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String naziv = rs.getString("naziv");
                Aktivnost aktivnost = new Aktivnost(id, naziv);
                aktivnosti.add(aktivnost);
            }
        } catch (SQLException e) {
            printSQLException(e);
        }

        return aktivnosti;
    }

    public boolean deleteAktivnost(int id) throws SQLException {
        boolean rowDeleted;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(DELETE_AKTIVNOST_SQL)) {
            statement.setInt(1, id);
            rowDeleted = statement.executeUpdate() > 0;
        }
        return rowDeleted;
    }

    public boolean updateAktivnost(Aktivnost aktivnost) throws SQLException {
        boolean rowUpdated;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(UPDATE_AKTIVNOST_SQL)) {
            statement.setString(1, aktivnost.getNaziv());
            statement.setInt(2, aktivnost.getId());
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
