package Service;

import Db.KomentarDb;
import Entiteti.Komentar;
import java.sql.SQLException;
import java.util.List;

public class KomentarService {
    private KomentarDb komentarDb = new KomentarDb();

    public void insertKomentar(Komentar komentar) throws SQLException {
        komentarDb.insertKomentar(komentar);
    }

    public List<Komentar> selectKomentar(int id) {
        return komentarDb.selectKomentareByClanakId(id);
    }

    public List<Komentar> selectAllKomentar() {
        return komentarDb.selectAllKomentar();
    }

    public boolean updateKomentar(Komentar komentar) throws SQLException {
        return komentarDb.updateKomentar(komentar);
    }

    public boolean deleteKomentar(int id) throws SQLException {
        return komentarDb.deleteKomentar(id);
    }
}

