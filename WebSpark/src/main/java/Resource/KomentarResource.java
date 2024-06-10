package Resource;

import Entiteti.Komentar;
import Service.KomentarService;
import com.google.gson.Gson;
import spark.Route;

import static spark.Spark.*;
import java.util.List;

public class KomentarResource {

    private final KomentarService komentarService = new KomentarService();
    private final Gson gson = new Gson();

    public void registerRoutes() {
        // Endpoint za dobijanje svih komentara
        get("/komentari", synchronizedRoute((req, res) -> {
            List<Komentar> komentari = komentarService.selectAllKomentar();
            return gson.toJson(komentari);
        }));

        // Endpoint za kreiranje novog komentara
        post("/komentari", synchronizedRoute((req, res) -> {
            Komentar noviKomentar = gson.fromJson(req.body(), Komentar.class);
            komentarService.insertKomentar(noviKomentar);
            return gson.toJson(noviKomentar);
        }));

        // Endpoint za dobijanje komentara po ID-u
        get("/komentari/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            List<Komentar> komentar = komentarService.selectKomentar(id);
            if (komentar != null) {
                return gson.toJson(komentar);
            } else {
                res.status(404);
                return "Komentar nije pronađen.";
            }
        }));

        // Endpoint za ažuriranje komentara po ID-u
        put("/komentari/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Komentar updateKomentar = gson.fromJson(req.body(), Komentar.class);
            updateKomentar.setId(id);
            komentarService.updateKomentar(updateKomentar);
            return gson.toJson(updateKomentar);
        }));

        // Endpoint za brisanje komentara po ID-u
        delete("/komentari/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            komentarService.deleteKomentar(id);
            res.status(204);
            return "";
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
