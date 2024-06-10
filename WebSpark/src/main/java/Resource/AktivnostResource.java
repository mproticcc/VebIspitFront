package Resource;

import Entiteti.Aktivnost;
import Service.AktivnostService;

import com.google.gson.Gson;
import spark.Route;

import static spark.Spark.*;

import java.util.List;

public class AktivnostResource {

    private final AktivnostService aktivnostService = new AktivnostService();
    private final Gson gson = new Gson();


    public void registerRoutes() {
        get("/aktivnosti", synchronizedRoute((req, res) -> {
            List<Aktivnost> aktivnosti = aktivnostService.selectAllAktivnost();
            return gson.toJson(aktivnosti);
        }));

        // Endpoint za kreiranje nove aktivnosti
        post("/aktivnosti", synchronizedRoute((req, res) -> {
            Aktivnost novaAktivnost = gson.fromJson(req.body(), Aktivnost.class);
            aktivnostService.insertAktivnost(novaAktivnost);
            return gson.toJson(novaAktivnost);
        }));

        // Endpoint za dobijanje aktivnosti po ID-u
        get("/aktivnosti/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Aktivnost aktivnost = aktivnostService.selectAktivnost(id);
            if (aktivnost != null) {
                return gson.toJson(aktivnost);
            } else {
                res.status(404);
                return "Aktivnost nije pronađena.";
            }
        }));

        // Endpoint za ažuriranje aktivnosti po ID-u
        put("/aktivnosti/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Aktivnost updateAktivnost = gson.fromJson(req.body(), Aktivnost.class);
            updateAktivnost.setId(id);
            aktivnostService.updateAktivnost(updateAktivnost);
            return gson.toJson(updateAktivnost);
        }));

        // Endpoint za brisanje aktivnosti po ID-u
        delete("/aktivnosti/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            aktivnostService.deleteAktivnost(id);
            res.status(204);
            return "";
        }));

        get("/aktivnosti/clanak/:clanak_id", synchronizedRoute((req, res) -> {
            int clanakId = Integer.parseInt(req.params(":clanak_id"));
            List<Aktivnost> aktivnosti = aktivnostService.selectAktivnostiByClanakId(clanakId);
            return gson.toJson(aktivnosti);
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

