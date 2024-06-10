drop database turisticki_vodic;
CREATE DATABASE turisticki_vodic;
USE turisticki_vodic;

CREATE TABLE korisnik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    ime VARCHAR(255) NOT NULL,
    prezime VARCHAR(255) NOT NULL,
    tip ENUM('uredjivac', 'admin') NOT NULL,
    status ENUM('aktivan', 'neaktivan') NOT NULL DEFAULT 'aktivan',
    lozinka VARCHAR(255) NOT NULL
);

CREATE TABLE destinacija (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(255) NOT NULL UNIQUE,
    opis TEXT NOT NULL
);

CREATE TABLE clanak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naslov VARCHAR(255) NOT NULL,
    tekst TEXT NOT NULL,
    datum_kreiranja DATETIME NOT NULL,
    broj_poseta INT NOT NULL DEFAULT 0,
    autor_id INT,
    destinacija_id INT,
    FOREIGN KEY (autor_id) REFERENCES korisnik(id)ON DELETE CASCADE, 
    FOREIGN KEY (destinacija_id) REFERENCES destinacija(id) ON DELETE CASCADE
);

CREATE TABLE aktivnost (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE clanak_aktivnost (
    clanak_id INT,
    aktivnost_id INT,
    PRIMARY KEY (clanak_id, aktivnost_id),
    FOREIGN KEY (clanak_id) REFERENCES clanak(id) ON DELETE CASCADE,
    FOREIGN KEY (aktivnost_id) REFERENCES aktivnost(id) ON DELETE CASCADE
);


CREATE TABLE komentar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime_autora VARCHAR(255) NOT NULL,
    tekst TEXT NOT NULL,
    datum_kreiranja DATETIME NOT NULL,
    clanak_id INT,
    FOREIGN KEY (clanak_id) REFERENCES clanak(id) ON DELETE CASCADE
);



INSERT INTO korisnik (email, ime, prezime, tip, status, lozinka)
VALUES
('admin@example.com', 'Admin', 'Adminic', 'admin', 'aktivan', SHA2('admin123', 256)),
('uredjivac@example.com', 'Uredjivac', 'Uredjic', 'uredjivac', 'aktivan', SHA2('uredjivac123', 256)),
('gost@example.com', 'Gost', 'Gostovic', 'uredjivac', 'aktivan', SHA2('gost123', 256)),
('novinar@example.com', 'Novinar', 'Novinaric', 'uredjivac', 'aktivan', SHA2('novinar123', 256)),
('marko.markovic@example.com', 'Marko', 'Marković', 'uredjivac', 'aktivan', SHA2('lozinka123', 256)),
('ana.anic@example.com', 'Ana', 'Anić', 'uredjivac', 'aktivan', SHA2('lozinka456', 256)),
('petar.petrovic@example.com', 'Petar', 'Petrović', 'uredjivac', 'aktivan', SHA2('urednik789', 256)),
('jovana.jovanovic@example.com', 'Jovana', 'Jovanović', 'uredjivac', 'aktivan', SHA2('novinar123', 256)),
('stefan.stankovic@example.com', 'Stefan', 'Stanković', 'uredjivac', 'aktivan', SHA2('putnik456', 256)),
('milica.milic@example.com', 'Milica', 'Milić', 'uredjivac', 'aktivan', SHA2('admin123', 256)),
('test@gmail.com', 'Mihailo', 'Protic', 'admin', 'aktivan', SHA2('123', 256)),
('test1@gmail.com', 'Mihailo', 'Protic', 'uredjivac', 'aktivan', SHA2('123', 256));

INSERT INTO destinacija (ime, opis)
VALUES
('Pariz', 'Grad svetlosti poznat po svojoj kulturi, istoriji i umetnosti.'),
('Tokio', 'Glavni grad Japana, poznat po svojoj tehnologiji, kulturi i hrani.'),
('London', 'Veliki grad sa bogatom istorijom i kulturom.'),
('Rim', 'Glavni grad Italije sa antičkim ruševinama i renesansnim umetnostima.'),
('Sidnej', 'Grad sa prelepom lukom i poznatim opernim kućama.'),
('Dubai', 'Grad superlativa, poznat po futurističkoj arhitekturi, luksuznoj kupovini i uzbudljivom noćnom životu.'),
('Njujork', 'Grad koji nikad ne spava');

INSERT INTO aktivnost (naziv)
VALUES
('Skijanje'),
('Planinarenje'),
('Plivanje'),
('Razgledanje znamenitosti'),
('Vožnja brodom'),
('Poseta muzejima'),
('Degustacija lokalnih specijaliteta'),
('Šoping'),
('Obilazak gradskih kvartova'),
('Adrenalinski sportovi');

INSERT INTO clanak (naslov, tekst, datum_kreiranja, autor_id, destinacija_id)
VALUES
('Najlepše znamenitosti Pariza', 'Pariz je grad sa mnogo znamenitosti koje privlače milione turista svake godine...', '2024-06-01 10:00:00', 1, 1),
('Zabava u Tokiju', 'Tokio nudi bezbroj mogućnosti za zabavu, od noćnog života do tradicionalnih festivala...', '2024-06-02 11:00:00', 2, 2),
('Istraživanje Londona', 'London je grad sa mnogo tajni koje čekaju da budu otkrivene...', '2024-06-03 12:00:00', 5, 3),
('Šetnja Rimom', 'Rim je grad prepun istorije i umetnosti. Svaki korak otkriva nešto novo...', '2024-06-04 13:00:00', 6, 4),
('Poseta Sidneju', 'Sidnej je jedinstven grad sa prelepim plažama i kulturnim događajima...', '2024-06-05 14:00:00', 7, 5),
('Magični Pariz', 'Otkrijte magiju Pariza, grad sa neograničenim mogućnostima za istraživanje.', '2024-06-06 15:00:00', 8, 1),
('Tokio: Grad kontrasta', 'Upoznajte raznolikost i kontraste u Tokiju, jednom od najuzbudljivijih gradova na svetu.', '2024-06-07 16:00:00', 9, 2),
('Njujork: Grad koji nikad ne spava', 'Doživite energiju i dinamiku Njujorka, grada koji pruža sve, od pozorišnih predstava do šetnji Central Parkom.', '2024-06-08 17:00:00', 10, 7),
('Rim: Putovanje kroz istoriju', 'Stupite u prošlost i istražite antičke ruševine i umetnost u Rimu, gradu koji je svojom lepotom inspirisao generacije.', '2024-06-09 18:00:00', 6, 4),
('Sidnej: Vrata ka Australiji', 'Otkrijte lepote i čari Sidneja, grada koji kombinuje urbani život sa opuštenim atmosferama plaža.', '2024-06-10 19:00:00', 8, 5),
('Dubai: Grad snova', 'Iskusite luksuz i glamur Dubaia, grada koji postavlja standarde za budućnost.', '2024-06-11 20:00:00', 9, 6);


INSERT INTO clanak_aktivnost (clanak_id, aktivnost_id)
VALUES
(1, 2),
(2, 3),
(3, 1),
(4, 2),
(5, 3),
(1, 1),
(2, 2),
(3, 4),
(4, 3),
(5, 5),
(6, 6),
(7, 2),
(8, 3),
(9, 1),
(10, 2),
(7, 1),
(8, 2),
(9, 4),
(10, 3),
(11, 5),
(7, 6),
(8, 1),
(9, 2),
(10, 4),
(11, 3),
(7, 5),
(8, 6),
(7, 4),
(8, 5),
(9, 6),
(10, 1),
(11, 2),
(7, 3),
(8, 4),
(9, 5),
(10, 6),
(11, 1);


INSERT INTO komentar (ime_autora, tekst, clanak_id, datum_kreiranja)
VALUES
('Petar Petrović', 'Odličan članak, puno korisnih informacija!', 1, '2024-06-01 10:00:00'),
('Jovana Jovanović', 'Pariz je prelep, jedva čekam da ga posetim!', 1, '2024-06-01 12:00:00'),
('Mila Milenković', 'Pariz je zaista nezaboravan grad!', 1, '2024-06-02 09:00:00'),
('Marta Marković', 'Ovaj članak mi je dao odlične savete za putovanje!', 1, '2024-06-02 11:00:00'),
('Igor Igrić', 'Ne mogu da dočekam da posetim Pariz ponovo.', 1, '2024-06-02 13:00:00'),
('Luka Luković', 'Pariz je uvek dobra ideja!', 1, '2024-06-03 10:00:00'),
('Katarina Katarić', 'Hvala na korisnim informacijama o Parizu!', 1, '2024-06-03 12:00:00'),
('Marko Marković', 'Tokio je fascinantan grad!', 2, '2024-06-01 14:00:00'),
('Vuk Vučić', 'Tokio me je ostavio bez daha.', 2, '2024-06-02 10:00:00'),
('Filip Filipović', 'Tokio je definitivno na vrhu moje liste destinacija.', 2, '2024-06-02 12:00:00'),
('Iva Ivanić', 'Ovaj članak me je inspirisao da posetim Tokio.', 2, '2024-06-03 09:00:00'),
('Petra Petrić', 'Ne mogu da verujem koliko zanimljivih stvari ima u Tokiju!', 2, '2024-06-03 11:00:00'),
('Stefan Stević', 'Sjajan članak o Tokiju, puno korisnih saveta!', 2, '2024-06-03 13:00:00'),
('Ana Anic', 'London je zaista fascinantan grad!', 3, '2024-06-01 16:00:00'),
('Sara Sarić', 'Njujork je grad koji se nikada ne zasitiš istraživati.', 3, '2024-06-02 14:00:00'),
('Marija Marjanović', 'London je uvek fascinantan.', 3, '2024-06-02 16:00:00'),
('Andrej Andrejić', 'Hvala na ovom divnom članku o Londonu!', 3, '2024-06-03 10:00:00'),
('Mila Milovanović', 'Ovaj članak me je inspirisao da istražim London više.', 3, '2024-06-03 12:00:00'),
('Teodora Teodorić', 'Predivan članak o Londonu!', 3, '2024-06-03 14:00:00'),
('Milan Milic', 'Rim me je oduševio svojom lepotom.', 4, '2024-06-01 18:00:00'),
('Dunja Dunjić', 'Rim ima posebno mesto u mom srcu.', 4, '2024-06-02 18:00:00'),
('Nikolina Nikolić', 'Rim je grad u koji bih se uvek vraćala.', 4, '2024-06-02 20:00:00'),
('Vladan Vladanović', 'Ovaj članak me je podsetio zašto volim Rim.', 4, '2024-06-03 10:00:00'),
('Dragana Dragić', 'Rim je zaista poseban grad.', 4, '2024-06-03 12:00:00'),
('Aleksandar Aleksić', 'Hvala na korisnim informacijama o Rimu!', 4, '2024-06-03 14:00:00'),
('Jelena Jelic', 'Sidnej je prelep, definitivno jedna od mojih omiljenih destinacija.', 5, '2024-06-01 20:00:00'),
('Nikola Nikolić', 'Sidnej je idealno mesto za odmor.', 5, '2024-06-02 22:00:00'),
('Maja Majkić', 'Sidnej je mesto koje bih volela da posetim jednog dana.', 5, '2024-06-02 23:00:00'),
('Danilo Danić', 'Ovaj članak me je inspirisao da istražim Sidnej.', 5, '2024-06-03 10:00:00'),
('Ivana Ivanić', 'Predivan članak o Sidneju!', 5, '2024-06-03 12:00:00'),
('Nina Ninić', 'Sidnej je grad koji bih volela da posetim.', 5, '2024-06-03 14:00:00'),
('Jana Janković', 'Dubai je grad budućnosti.', 6, '2024-06-01 22:00:00'),
('Bogdan Bogdanović', 'Dubai je zaista grad budućnosti.', 6, '2024-06-02 23:00:00'),
('Tijana Tijanić', 'Ovaj članak me je oduševio!', 6, '2024-06-03 09:00:00'),
('Vladimir Vladanović', 'Dubai je definitivno na mojoj listi za posetu.', 6, '2024-06-03 11:00:00'),
('Anđela Anđelić', 'Hvala na korisnim informacijama o Dubaiju!', 6, '2024-06-03 13:00:00'),
('Luka Lukic', 'Neverovatna destinacija! Tokio zaista ima sve.', 7, '2024-06-01 08:00:00'),
('Marija Maric', 'Ovaj članak me je inspirisao da posetim Tokio.', 7, '2024-06-02 08:00:00'),
('Stefan Stevic', 'Sjajan opis grada, moram da idem!', 7, '2024-06-03 08:00:00'),
('Ivana Ivanovic', 'Predivne slike i sjajan tekst!', 7, '2024-06-04 08:00:00'),
('Ana Anic', 'Njujork je na mojoj listi želja!', 8, '2024-06-01 09:00:00'),
('Milan Milic', 'Ovaj članak odlično prikazuje energiju grada.', 8, '2024-06-02 09:00:00'),
('Jelena Jelic', 'Njujork zaista nikad ne spava!', 8, '2024-06-03 09:00:00'),
('Mila Milenkovic', 'Definitivno želim da posetim Njujork posle ovoga.', 8, '2024-06-04 09:00:00'),
('Vuk Vucic', 'Rim je predivan, ovaj članak to sjajno dočarava.', 9, '2024-06-01 10:00:00'),
('Sara Saric', 'Volim istoriju, Rim je savršeno mesto za mene.', 9, '2024-06-02 10:00:00'),
('Dunja Dunjic', 'Sjajan članak, Rim je predivan!', 9, '2024-06-03 10:00:00'),
('Nikola Nikolic', 'Rim je zaista mesto gde prošlost oživljava.', 9, '2024-06-04 10:00:00'),
('Jana Jankovic', 'Sidnej izgleda prelepo, jedva čekam da ga posetim!', 10, '2024-06-01 11:00:00'),
('Marko Markovic', 'Ovaj članak me je uverio da posetim Sidnej.', 10, '2024-06-02 11:00:00'),
('Ana Anic', 'Sidnej ima prelepe plaže!', 10, '2024-06-03 11:00:00'),
('Milan Milic', 'Sjajan članak, Sidnej je sada na mojoj listi želja.', 10, '2024-06-04 11:00:00'),
('Jelena Jelic', 'Dubai zaista izgleda kao grad snova!', 11, '2024-06-01 12:00:00'),
('Mila Milenkovic', 'Volim luksuz, Dubai je savršeno mesto za mene.', 11, '2024-06-02 12:00:00'),
('Vuk Vucic', 'Ovaj članak je odličan vodič kroz Dubai.', 11, '2024-06-03 12:00:00'),
('Sara Saric', 'Dubai me je oduševio, sjajan članak!', 11, '2024-06-04 12:00:00');

select * from clanak;

-- ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
-- FLUSH PRIVILEGES;