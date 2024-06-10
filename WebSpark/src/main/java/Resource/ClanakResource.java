package Resource;

import Entiteti.Clanak;
import Service.ClanakService;
import Service.KorisnikService;
import com.google.gson.Gson;
import spark.Route;

import java.sql.SQLException;
import java.util.List;

import static spark.Spark.*;

public class ClanakResource {

    private final ClanakService clanakService = new ClanakService();
    private final Gson gson = new Gson();

    public void registerRoutes() {
        get("/clanci", synchronizedRoute((req, res) -> {
            List<Clanak> clanci = clanakService.selectAllClanak();
            return gson.toJson(clanci);
        }));

        post("/clanci", synchronizedRoute((req, res) -> {
            Clanak clanak = gson.fromJson(req.body(), Clanak.class);
            clanakService.insertClanak(clanak);
            return gson.toJson(clanak);
        }));

        get("/clanci/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Clanak clanak = clanakService.selectClanak(id);
            if (clanak != null) {
                return gson.toJson(clanak);
            } else {
                res.status(404);
                return "Clanak not found";
            }
        }));

        put("/clanci/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Clanak clanak = gson.fromJson(req.body(), Clanak.class);
            clanak.setId(id);
            clanakService.updateClanak(clanak);
            return gson.toJson(clanak);
        }));

        delete("/clanci/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            clanakService.deleteClanak(id);
            res.status(204);
            return "";
        }));

        put("/clanci/:id/inkrementiraj_posete", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            try {
                clanakService.incrementVisitCount(id);
                res.status(200);
                return "Broj poseta za članak sa ID " + id + " je uspešno inkrementiran.";
            } catch (SQLException e) {
                res.status(500);
                return "Došlo je do greške prilikom inkrementiranja broja poseta za članak sa ID " + id + ": " + e.getMessage();
            }
        }));

        get("/clanci/aktivnost/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            try {
                List<Clanak> clanci = clanakService.selectClanakAktivnost(id);
                return gson.toJson(clanci);
            } catch (SQLException e) {
                res.status(500);
                return "Došlo je do greške prilikom dohvatanja članaka na osnovu aktivnosti sa ID " + id + ": " + e.getMessage();
            }
        }));
        get("/clanci/destinacija/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            try {
                List<Clanak> clanci = clanakService.selectClanciByDestinacijaId(id);
                return gson.toJson(clanci);
            } catch (SQLException e) {
                res.status(500);
                return "Došlo je do greške prilikom dohvatanja članaka na osnovu destinacije sa ID " + id + ": " + e.getMessage();
            }
        }));

    }

    private static Route synchronizedRoute(Route route) {
        return (req, res) -> {
            synchronized (route) {
                return route.handle(req, res);
            }
        };
    }

}
