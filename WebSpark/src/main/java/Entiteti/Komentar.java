package Entiteti;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public class Komentar {
    private int id;
    private String ime_autora;
    private String tekst;
    private Timestamp datumKreiranja;
    private int clanakId;

    public Komentar(int id, String ime_autora, String tekst, Timestamp datumKreiranja, int clanakId) {
        this.id = id;
        this.ime_autora = ime_autora;
        this.tekst = tekst;
        this.datumKreiranja = datumKreiranja;
        this.clanakId = clanakId;
    }
}
