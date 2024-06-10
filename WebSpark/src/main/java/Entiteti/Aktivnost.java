package Entiteti;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Aktivnost {
    private int id;
    private String naziv;

    public Aktivnost(int id, String naziv) {
        this.id = id;
        this.naziv = naziv;
    }
    public Aktivnost() {

    }
}
