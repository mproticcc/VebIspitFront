package Db;

import Entiteti.Komentar;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class KomentarDb {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/turisticki_vodic";
    private final String jdbcUsername = "root";
    private final String jdbcPassword = "root";

    private static final String INSERT_KOMENTAR_SQL = "INSERT INTO komentar (ime_autora, tekst, datum_kreiranja, clanak_id) VALUES (?, ?, ?, ?)";
    private static final String SELECT_KOMENTAR_BY_ID = "SELECT id, ime_autora, tekst, datum_kreiranja, clanak_id FROM komentar WHERE id = ?";
    private static final String SELECT_ALL_KOMENTAR = "SELECT * FROM komentar";
    private static final String DELETE_KOMENTAR_SQL = "DELETE FROM komentar WHERE id = ?";
    private static final String UPDATE_KOMENTAR_SQL = "UPDATE komentar SET ime_autora = ?, tekst = ?, datum_kreiranja = ?, clanak_id = ? WHERE id = ?";

    protected Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    public void insertKomentar(Komentar komentar) throws SQLException {
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(INSERT_KOMENTAR_SQL)) {
            preparedStatement.setString(1, komentar.getIme_autora());
            preparedStatement.setString(2, komentar.getTekst());
            preparedStatement.setTimestamp(3, komentar.getDatumKreiranja());
            preparedStatement.setInt(4, komentar.getClanakId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            printSQLException(e);
        }
    }

    public List<Komentar> selectKomentareByClanakId(int clanakId) {
        List<Komentar> komentari = new ArrayList<>();
        String query = "SELECT * FROM komentar WHERE clanak_id = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, clanakId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String ime_autora = rs.getString("ime_autora");
                String tekst = rs.getString("tekst");
                Timestamp datumKreiranja = rs.getTimestamp("datum_kreiranja");
                Komentar komentar = new Komentar(id, ime_autora, tekst, datumKreiranja, clanakId);
                komentari.add(komentar);
            }
        } catch (SQLException e) {
            printSQLException(e);
        }

        return komentari;
    }


    public List<Komentar> selectAllKomentar() {
        List<Komentar> komentarList = new ArrayList<>();
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_KOMENTAR)) {
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String ime_autora = rs.getString("ime_autora");
                String tekst = rs.getString("tekst");
                Timestamp datumKreiranja = rs.getTimestamp("datum_kreiranja");
                int clanakId = rs.getInt("clanak_id");
                komentarList.add(new Komentar(id, ime_autora, tekst, datumKreiranja, clanakId));
            }
        } catch (SQLException e) {
            printSQLException(e);
        }
        return komentarList;
    }

    public boolean deleteKomentar(int id) throws SQLException {
        boolean rowDeleted;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(DELETE_KOMENTAR_SQL)) {
            statement.setInt(1, id);
            rowDeleted = statement.executeUpdate() > 0;
        }
        return rowDeleted;
    }

    public boolean updateKomentar(Komentar komentar) throws SQLException {
        boolean rowUpdated;
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(UPDATE_KOMENTAR_SQL)) {
            statement.setString(1, komentar.getIme_autora());
            statement.setString(2, komentar.getTekst());
            statement.setTimestamp(3, komentar.getDatumKreiranja());
            statement.setInt(4, komentar.getClanakId());
            statement.setInt(5, komentar.getId());
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
