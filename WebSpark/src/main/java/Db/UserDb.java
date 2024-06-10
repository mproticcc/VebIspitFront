package Db;

import Entiteti.Korisnik;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserDb {
    private final String jdbcURL = "jdbc:mysql://localhost:3306/turisticki_vodic";
    private final String jdbcUsername = "root";
    private final String jdbcPassword = "root";

    private static final String secretKey = "tajni_kljuc_123";

    public UserDb() {
        try {
            Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Korisnik> selectAllKorisnik() {
        List<Korisnik> korisnici = new ArrayList<>();
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM korisnik")) {

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String ime = resultSet.getString("ime");
                String prezime = resultSet.getString("prezime");
                String email = resultSet.getString("email");
                String tip = resultSet.getString("tip");
                String status = resultSet.getString("status");
                String lozinka = resultSet.getString("lozinka");
                korisnici.add(new Korisnik(id, email, ime, prezime, tip, status, lozinka));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return korisnici;
    }

    public String login(String email, String password) {
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword)) {
            String query = "SELECT * FROM korisnik WHERE email = ? AND lozinka = ? AND status = 'aktivan'";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, email);
                preparedStatement.setString(2, password);
                ResultSet resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String ime = resultSet.getString("ime");
                    String prezime = resultSet.getString("prezime");
                    String tip = resultSet.getString("tip");
                    String status = resultSet.getString("status");
                    return generateJWT(id, email, ime, prezime, tip, status);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deactivateUser(int userId) {
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword)) {
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE korisnik SET status = 'neaktivan' WHERE id = ?");
            preparedStatement.setInt(1, userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void activateUser(int userId) {
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword)) {
            PreparedStatement preparedStatement = connection.prepareStatement("UPDATE korisnik SET status = 'aktivan' WHERE id = ?");
            preparedStatement.setInt(1, userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String generateJWT(int userId, String email, String ime, String prezime, String tip, String status) {
        long currentTimeMillis = System.currentTimeMillis();
        return Jwts.builder()
                .claim("userId", userId)
                .claim("email", email)
                .claim("ime", ime)
                .claim("prezime", prezime)
                .claim("tip", tip)
                .claim("status", status)
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + 3600000)) // Token važi 1 sat
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public void insertKorisnik(Korisnik korisnik) {
        String sql = "INSERT INTO korisnik (email, ime, prezime, tip, status, lozinka) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            if (korisnikPostoji(korisnik.getEmail(), korisnik.getIme(), korisnik.getPrezime())) {
                System.err.println("Korisnik sa datim email-om, imenom i prezimenom već postoji.");
                return;
            }
            preparedStatement.setString(1, korisnik.getEmail());
            preparedStatement.setString(2, korisnik.getIme());
            preparedStatement.setString(3, korisnik.getPrezime());
            preparedStatement.setString(4, korisnik.getTip());
            preparedStatement.setString(5, korisnik.getStatus());
            preparedStatement.setString(6, korisnik.getLozinka());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private boolean korisnikPostoji(String email, String ime, String prezime) {
        String sql = "SELECT COUNT(*) FROM korisnik WHERE email = ? OR (ime = ? AND prezime = ?)";

        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, ime);
            preparedStatement.setString(3, prezime);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int count = resultSet.getInt(1);
                return count > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public Korisnik selectKorisnik(int id) {
        Korisnik korisnik = null;
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM korisnik WHERE id = ?")) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String ime = resultSet.getString("ime");
                String prezime = resultSet.getString("prezime");
                korisnik = new Korisnik(String.valueOf(id), ime, prezime);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return korisnik;
    }

    public void updateKorisnik(Korisnik korisnik) {
        String sql = "UPDATE korisnik SET email = ?, ime = ?, prezime = ?, tip = ?, status = ?, lozinka = ? WHERE id = ?";

        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, korisnik.getEmail());
            preparedStatement.setString(2, korisnik.getIme());
            preparedStatement.setString(3, korisnik.getPrezime());
            preparedStatement.setString(4, korisnik.getTip());
            preparedStatement.setString(5, korisnik.getStatus());
            preparedStatement.setString(6, korisnik.getLozinka());
            preparedStatement.setInt(7, korisnik.getId());
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteKorisnik(int id) {
        try (Connection connection = DriverManager.getConnection(jdbcURL, jdbcUsername, jdbcPassword);
             PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM korisnik WHERE id = ?")) {
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
