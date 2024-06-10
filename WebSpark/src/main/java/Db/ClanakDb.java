package Db;

import Entiteti.Aktivnost;
import Entiteti.Clanak;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ClanakDb {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/turisticki_vodic";
    private final String jdbcUsername = "root";
    private final String jdbcPassword = "root";

    private static final String INSERT_CLANAK_SQL = "INSERT INTO clanak (naslov, tekst, datum_kreiranja, broj_poseta, autor_id, destinacija_id) VALUES (?, ?, ?, ?, ?, ?)";
    private static final String SELECT_CLANAK_BY_ID = "SELECT id, naslov, tekst, datum_kreiranja, broj_poseta, autor_id, destinacija_id FROM clanak WHERE id = ?";
    private static final String SELECT_ALL_CLANAK = "SELECT * FROM clanak";
    private static final String DELETE_CLANAK_SQL = "DELETE FROM clanak WHERE id = ?";
    private static final String UPDATE_CLANAK_SQL = "UPDATE clanak SET naslov = ?, tekst = ?,destinacija_id = ? WHERE id = ?";

    private static final String INCREMENT_VISIT_COUNT_SQL = "UPDATE clanak SET broj_poseta = broj_poseta + 1 WHERE id = ?";

    private static final String SELECT_CLANAK_AKTIVNOST_QUERY =
            "SELECT c.id AS clanak_id, c.naslov, c.tekst, c.datum_kreiranja, c.broj_poseta,c.destinacija_id, " +
                    "       a.id AS aktivnost_id, a.naziv AS aktivnost_naziv " +
                    "FROM clanak c " +
                    "INNER JOIN clanak_aktivnost ca ON c.id = ca.clanak_id " +
                    "INNER JOIN aktivnost a ON ca.aktivnost_id = a.id " +
                    "WHERE ca.aktivnost_id = ?";

    protected Connection getConnection() throws SQLException {
        return DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
    }

    public void insertClanak(Clanak clanak) throws SQLException {
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(INSERT_CLANAK_SQL)) {
            preparedStatement.setString(1, clanak.getNaslov());
            preparedStatement.setString(2, clanak.getTekst());
            preparedStatement.setTimestamp(3, clanak.getDatumKreiranja());
            preparedStatement.setInt(4, clanak.getBrojPoseta());
            preparedStatement.setInt(5, clanak.getAutorId());
            preparedStatement.setInt(6, clanak.getDestinacijaId());
            preparedStatement.executeUpdate();
        }
    }
    public void incrementVisitCount(int id) throws SQLException {
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(INCREMENT_VISIT_COUNT_SQL)) {
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
        }
    }


    public Clanak selectClanak(int id) throws SQLException {
        Clanak clanak = null;
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_CLANAK_BY_ID)) {
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                String naslov = rs.getString("naslov");
                String tekst = rs.getString("tekst");
                Timestamp datumKreiranja = rs.getTimestamp("datum_kreiranja");
                int brojPoseta = rs.getInt("broj_poseta");
                int autorId = rs.getInt("autor_id");
                int destinacijaId = rs.getInt("destinacija_id");
                clanak = new Clanak(id, naslov, tekst, datumKreiranja, brojPoseta, autorId, destinacijaId);
            }
        }
        return clanak;
    }

    public List<Clanak> selectAllClanak() throws SQLException {
        List<Clanak> clanakList = new ArrayList<>();
        try (Connection connection = getConnection(); PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL_CLANAK)) {
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String naslov = rs.getString("naslov");
                String tekst = rs.getString("tekst");
                Timestamp datumKreiranja = rs.getTimestamp("datum_kreiranja");
                int brojPoseta = rs.getInt("broj_poseta");
                int autorId = rs.getInt("autor_id");
                int destinacijaId = rs.getInt("destinacija_id");
                clanakList.add(new Clanak(id, naslov, tekst, datumKreiranja, brojPoseta, autorId, destinacijaId));
            }
        }


        clanakList.sort(Comparator.comparing(Clanak::getDatumKreiranja, Comparator.reverseOrder()));

        return clanakList;
    }

    public List<Clanak> selectClanciByDestinacijaId(int destinacijaId) throws SQLException {
        List<Clanak> clanakList = new ArrayList<>();
        String query = "SELECT * FROM clanak WHERE destinacija_id = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, destinacijaId);
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String naslov = rs.getString("naslov");
                String tekst = rs.getString("tekst");
                Timestamp datumKreiranja = rs.getTimestamp("datum_kreiranja");
                int brojPoseta = rs.getInt("broj_poseta");
                int autorId = rs.getInt("autor_id");
                int destinacijaIdFromDb = rs.getInt("destinacija_id");
                Clanak clanak = new Clanak(id, naslov, tekst, datumKreiranja, brojPoseta, autorId, destinacijaIdFromDb);
                clanakList.add(clanak);
            }
        }

        return clanakList;
    }




    public void deleteClanak(int id) throws SQLException {
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(DELETE_CLANAK_SQL)) {
            statement.setInt(1, id);
            statement.executeUpdate();
        }
    }

    public boolean updateClanak(Clanak clanak) throws SQLException {
        System.out.println(clanak);
        try (Connection connection = getConnection(); PreparedStatement statement = connection.prepareStatement(UPDATE_CLANAK_SQL)) {
            statement.setString(1, clanak.getNaslov());
            statement.setString(2, clanak.getTekst());
            statement.setInt(3, clanak.getDestinacijaId());
            statement.setInt(4, clanak.getId());
            return statement.executeUpdate() > 0;
        }
    }


    public List<Clanak> selectClanakAktivnost(int aktivnostId) {
        List<Clanak> clanakAktivnostList = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement(SELECT_CLANAK_AKTIVNOST_QUERY)) {

            preparedStatement.setInt(1, aktivnostId);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    int clanakId = resultSet.getInt("clanak_id");
                    String naslov = resultSet.getString("naslov");
                    String tekst = resultSet.getString("tekst");
                    Timestamp datumKreiranja = resultSet.getTimestamp("datum_kreiranja");
                    int brojPoseta = resultSet.getInt("broj_poseta");
                    int destinacijaId = resultSet.getInt("destinacija_id");

                    Clanak clanak = new Clanak();
                    clanak.setId(clanakId);
                    clanak.setNaslov(naslov);
                    clanak.setTekst(tekst);
                    clanak.setDatumKreiranja(datumKreiranja);
                    clanak.setBrojPoseta(brojPoseta);
                    clanak.setDestinacijaId(destinacijaId);

                    Aktivnost aktivnost = new Aktivnost();
                    aktivnost.setId(resultSet.getInt("aktivnost_id"));
                    aktivnost.setNaziv(resultSet.getString("aktivnost_naziv"));

                    clanak.setAktivnost(aktivnost);

                    clanakAktivnostList.add(clanak);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return clanakAktivnostList;
    }
}