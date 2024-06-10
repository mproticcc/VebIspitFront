package Resource;

import Entiteti.Destinacija;
import Service.ClanakService;
import Service.DestinacijaService;
import com.google.gson.Gson;
import spark.Route;

import java.util.List;

import static spark.Spark.*;

public class DestinacijaResource {

    private final DestinacijaService destinacijaService = new DestinacijaService();
    private final Gson gson = new Gson();

    public void registerRoutes() {
        get("/destinacije", synchronizedRoute((req, res) -> {
            List<Destinacija> destinacije = destinacijaService.selectAllDestinacija();
            return gson.toJson(destinacije);
        }));

        post("/destinacije", synchronizedRoute((req, res) -> {
            Destinacija novaDestinacija = gson.fromJson(req.body(), Destinacija.class);
            destinacijaService.insertDestinacija(novaDestinacija);
            return gson.toJson(novaDestinacija);
        }));

        get("/destinacije/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Destinacija destinacija = destinacijaService.selectDestinacija(id);
            if (destinacija != null) {
                return gson.toJson(destinacija);
            } else {
                res.status(404);
                return "Destinacija nije pronađena.";
            }
        }));

        put("/destinacije/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            Destinacija updateDestinacija = gson.fromJson(req.body(), Destinacija.class);
            updateDestinacija.setId(id);
            destinacijaService.updateDestinacija(updateDestinacija);
            return gson.toJson(updateDestinacija);
        }));

        delete("/destinacije/:id", synchronizedRoute((req, res) -> {
            int id = Integer.parseInt(req.params(":id"));
            destinacijaService.deleteDestinacija(id);
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
