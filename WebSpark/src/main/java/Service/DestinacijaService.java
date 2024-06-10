package Service;

import Db.DestinacijaDb;
import Entiteti.Destinacija;

import java.sql.SQLException;
import java.util.List;

public class DestinacijaService {
    private DestinacijaDb destinacijaDb = new DestinacijaDb();

    public void insertDestinacija(Destinacija destinacija) throws SQLException {
        destinacijaDb.insertDestinacija(destinacija);
    }

    public Destinacija selectDestinacija(int id) {
        return destinacijaDb.selectDestinacija(id);
    }

    public List<Destinacija> selectAllDestinacija() {
        return destinacijaDb.selectAllDestinacija();
    }

    public boolean updateDestinacija(Destinacija destinacija) throws SQLException {
        return destinacijaDb.updateDestinacija(destinacija);
    }

    public boolean deleteDestinacija(int id) throws SQLException {
        return destinacijaDb.deleteDestinacija(id);
    }
}

