package Service;

import Db.ClanakDb;
import Db.UserDb;
import Entiteti.Clanak;

import java.sql.SQLException;
import java.util.List;

public class ClanakService {
    private ClanakDb clanakDb = new ClanakDb();


    public void insertClanak(Clanak clanak) throws SQLException {
        clanakDb.insertClanak(clanak);
    }

    public Clanak selectClanak(int id) throws SQLException {
        return clanakDb.selectClanak(id);
    }
    public void incrementVisitCount(int id) throws SQLException {
        clanakDb.incrementVisitCount(id);
    }

    public List<Clanak> selectAllClanak() throws SQLException {
        return clanakDb.selectAllClanak();
    }

    public boolean updateClanak(Clanak clanak) throws SQLException {
        return clanakDb.updateClanak(clanak);
    }

    public void deleteClanak(int id) throws SQLException {
         clanakDb.deleteClanak(id);
    }
    public List<Clanak> selectClanakAktivnost(int id) throws SQLException {
        return clanakDb.selectClanakAktivnost(id);
    }
    public List<Clanak> selectClanciByDestinacijaId(int destinacijaId) throws SQLException {
        return clanakDb.selectClanciByDestinacijaId(destinacijaId);
    }
}

