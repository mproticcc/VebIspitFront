package Service;
import Db.UserDb;
import Entiteti.Korisnik;
import java.sql.*;
import java.util.List;

public class KorisnikService {
    private UserDb korisnikDAO = new UserDb();

    public String insertKorisnik(Korisnik korisnik) {
        return korisnikDAO.insertKorisnik(korisnik);
    }

    public Korisnik selectKorisnik(int id) {
        return korisnikDAO.selectKorisnik(id);
    }

    public List<Korisnik> selectAllKorisnik() {
        return korisnikDAO.selectAllKorisnik();
    }

    public void updateKorisnik(Korisnik korisnik) {
        korisnikDAO.updateKorisnik(korisnik);
    }

    public void deleteKorisnik(int id) {
        korisnikDAO.deleteKorisnik(id);
    }

    public String login(String email, String password) {
        return korisnikDAO.login(email, password);
    }
    public void activateUser(int userId) {
        korisnikDAO.activateUser(userId);
    }

    public void deactivateUser(int userId) {
        korisnikDAO.deactivateUser(userId);
    }
}

