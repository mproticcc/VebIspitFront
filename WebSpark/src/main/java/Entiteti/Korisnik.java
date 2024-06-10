package Entiteti;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Korisnik {
    private int id;
    private String email;
    private String ime;
    private String prezime;
    private String tip;
    private String status;
    private String lozinka;

    public Korisnik(int id, String email, String ime, String prezime, String tip, String status, String lozinka) {
        this.id = id;
        this.email = email;
        this.ime = ime;
        this.prezime = prezime;
        this.tip = tip;
        this.status = status;
        this.lozinka = lozinka;
    }

    public Korisnik(String email, String ime, String lozinka) {
        this.email = email;
        this.ime = ime;
        this.lozinka = lozinka;
    }

}
