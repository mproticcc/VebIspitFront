package Entiteti;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public class Clanak {
    private int id;
    private String naslov;
    private String tekst;
    private Timestamp datumKreiranja;
    private int brojPoseta;
    private int autorId;
    private int destinacijaId;

    private Aktivnost aktivnost;

    public Clanak(int id, String naslov, String tekst, Timestamp datumKreiranja, int brojPoseta, int autorId, int destinacijaId) {
        this.id = id;
        this.naslov = naslov;
        this.tekst = tekst;
        this.datumKreiranja = datumKreiranja;
        this.brojPoseta = brojPoseta;
        this.autorId = autorId;
        this.destinacijaId = destinacijaId;
    }
    public Clanak() {

    }
}
