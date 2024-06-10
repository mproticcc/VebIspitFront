package Service;

import Db.AktivnostDb;
import Entiteti.Aktivnost;
import java.sql.SQLException;
import java.util.List;

public class AktivnostService {
    private AktivnostDb aktivnostDb = new AktivnostDb();

    public void insertAktivnost(Aktivnost aktivnost) throws SQLException {
        aktivnostDb.insertAktivnost(aktivnost);
    }

    public Aktivnost selectAktivnost(int id) {
        return aktivnostDb.selectAktivnost(id);
    }

    public List<Aktivnost> selectAllAktivnost() {
        return aktivnostDb.selectAllAktivnost();
    }

    public boolean updateAktivnost(Aktivnost aktivnost) throws SQLException {
        return aktivnostDb.updateAktivnost(aktivnost);
    }

    public boolean deleteAktivnost(int id) throws SQLException {
        return aktivnostDb.deleteAktivnost(id);
    }

    public List<Aktivnost> selectAktivnostiByClanakId(int clanakId) {
        return aktivnostDb.selectAktivnostiByClanakId(clanakId);
    }
}

