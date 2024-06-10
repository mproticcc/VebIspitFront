import Resource.*;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {

        port(8080);
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        before((request, response) -> {
            System.out.println("Primljen zahtev: " + request.requestMethod() + " " + request.uri());
        });

        exception(Exception.class, (exception, request, response) -> {
            exception.printStackTrace();
            response.status(500);
            response.body("Dogodila se greška: " + exception.getMessage());
        });

        new KorisnikResource().registerRoutes();
        new ClanakResource().registerRoutes();
        new DestinacijaResource().registerRoutes();
        new AktivnostResource().registerRoutes();
        new KomentarResource().registerRoutes();
    }
}
