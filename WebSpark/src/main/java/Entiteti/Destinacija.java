package Entiteti;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Destinacija {
    private int id;
    private String ime;
    private String opis;

    public Destinacija(int id, String ime, String opis) {
        this.id = id;
        this.ime = ime;
        this.opis = opis;
    }

}
