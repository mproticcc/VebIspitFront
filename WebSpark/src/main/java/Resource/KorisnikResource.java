package Resource;


import Entiteti.Korisnik;
import Service.KorisnikService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import spark.Route;

import static spark.Spark.*;

public class KorisnikResource {
    private final KorisnikService korisnikService = new KorisnikService();
    private final Gson gson = new Gson();

    private static final String secretKey = "tajni_kljuc_123";
    private boolean isAdmin(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody();
            String userType = claims.get("tip", String.class);
            return "admin".equals(userType);
        } catch (Exception e) {
            return false;
        }
    }
    public void registerRoutes() {
//        before("/korisnici", (req, res) -> {
//            String token = req.headers("Authorization");
//            if (token == null || !isAdmin(token)) {
//                halt(401, "Unauthorized");
//            }
//        });

        get("/korisnici", synchronizedRoute((req, res) -> {
            res.type("application/json");
            return gson.toJson(korisnikService.selectAllKorisnik());
        }));


        get("/korisnici/:id", synchronizedRoute((req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            Korisnik korisnik = korisnikService.selectKorisnik(id);
            if (korisnik != null) {
                return gson.toJson(korisnik);
            } else {
                res.status(404);
                return "Korisnik not found";
            }
        }));

        post("/korisnici", synchronizedRoute((req, res) -> {
            res.type("application/json");
            Korisnik korisnik = gson.fromJson(req.body(), Korisnik.class);
            String result = korisnikService.insertKorisnik(korisnik);
            if (result != null) {
                res.status(401);
                return gson.toJson(result);
            } else {
                return gson.toJson(korisnik);
            }
        }));

        put("/korisnici/:id", synchronizedRoute((req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            Korisnik korisnik = gson.fromJson(req.body(), Korisnik.class);
            korisnik.setId(id);
            korisnikService.updateKorisnik(korisnik);
            return "";
        }));

        delete("/korisnici/:id", synchronizedRoute((req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            korisnikService.deleteKorisnik(id);
            return "";
        }));

        post("/login", synchronizedRoute((req, res) -> {
            res.type("application/json");
            String body = req.body();
            JsonObject json = gson.fromJson(body, JsonObject.class);
            String email = json.get("email").getAsString();
            String password = json.get("password").getAsString();
            String token = korisnikService.login(email, password);
            if (token != null) {
                return gson.toJson(token);
            } else {
                res.status(401);
                return "Invalid email or password";
            }
        }));

        get("/aktiviraj/:id", synchronizedRoute((req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            korisnikService.activateUser(id);
            return "Korisnik aktiviran";
        }));

        get("/deaktiviraj/:id", synchronizedRoute((req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            korisnikService.deactivateUser(id);
            return "Korisnik deaktiviran";
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
