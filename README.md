# Vincit-assignment-2020
Pre-assignment for Vincit summer internships 2020.

A multiplayer game where each user increments a global counter by clicking a button.

* Every 10th press gets 5 points.
* Every 100th press gets 40 points.
* Every 500th press get 250 points.

The users don't know the state of the counter when they press the button.
After each click, a user gets a response with their possible reward and how many clicks there are untill the next reward.
Every user starts with 20 points and a click decrements the points by 1. Each reward is added to the points.
The button is clickable only if the user has 1 or more points.

Deployed to heroku:
* Frontend: https://vincit-game-frontend.herokuapp.com/
* Backend: https://vincit-game-backend.herokuapp.com/

## Stack

##### Frontend

* React

##### Backend

* Node.js
* express
* mongoose

##### DB
* mongodb

## Running e2e tests

```bash
cd backend
docker-compose -f docker-compose.test.yml up # start backend in e2e mode

cd frontend && yarn start:e2e # start frontend in e2e mode

cd frontend && yarn cypress open # open cypress
```

## Assignment (in Finnish)
Tavoitteena on toteuttaa yksinkertainen moninpeli, jota pelataan painamalla painiketta.
Painikkeen painaminen maksaa yhden pisteen, joita pelaajalla on lähtötilanteessa 20.
Painiketta voi painaa vain, jos pelaajan pistesaldo on positiivinen.
Pelaajan painettuapainiketta hänelle ilmoitetaan mahdollisesta voitosta.

Pelaaja voittaa
* 5 pistettä joka 10. painallus
* 40 pistettä joka 100. painallus
* 250 pistettä joka 500. painallus.

Pelaaja voi voittaa enimmillään yhden palkinnon yhdellä painalluksella.
Mikäli samalla painalluksella voittaisi yllä olevan listan mukaan monta palkintoa, voittaa pelaaja näistä suurimman.
Painiketta painaessa pelaaja ei tiedä, mikä laskurin nykyinen arvo on, sillä kaikkipelaajat kasvattavat saman laskurin arvoa.

Kun pelaaja painaa painiketta, tapahtuu seuraavat asiat:
  1. Pelaajalta vähennetään yksi piste.
  2. Laskurin arvo kasvaa yhdellä.
  3. Mikäli laskurin arvolle osuu palkinto (esim. laskurin arvolla 500 voittaa 250 pistettä), ilmoitetaan tästä pelaajalle ja lisätään voitto pelaajan pistesaldoon.
  4. Pelaajalle näytetään vaadittujen painallusten määrä seuraavaan voittavaan arvoon.

Pelin käyttöliittymässä tulee näkyä pelaajan pistesaldo.
Pelitilanteen tulee säilyä, vaikkaselaimen (mikäli selainsovellus) tai sovelluksen (mikäli mobiilisovellus) käynnistää uudelleen.
Mikäli pelaajan pistesaldo on 0, tarjotaan pelaajalle mahdollisuus aloittaa alusta, jolloinhänen pistesaldonsa palautetaan jälleen arvoon 20.

Sovellus koostuu kahdesta osasta: käyttöliittymästä ja palvelimesta.

Pelin käyttöliittymä voidaan toteuttaa joko selain- tai mobiilisovelluksena.
Selainsovelluksentoivotaan olevan tehty nykyaikaisilla työkaluilla, kuten Reactilla, Vuella tai Angularilla.
Mobiilisovellus voi olla Android-, iOS- tai hybridisovellus.

Palvelinsovelluksen voit toteuttaa haluamillasi teknologioilla.
On toivottavaa, että palvelin olisi julkisesti saatavilla jossakin pilvipalvelussa.
Esimerkiksi Heroku tarjoaa ilmaisentestipalvelimen, mutta voit käyttää halutessasi myös muita palveluntarjoajia.
Lähetä kotitehtävä meille esim. linkkinä GitHub-repositorioon tai liitetiedostona (.zip).

Versionhallinnan tai liitetiedoston tulee sisältää kaikki sellaiset tiedostot ja ohjeet, jotka vaaditaan sovelluksen kääntämiseen ja käynnistämiseen. 
Kiinnitä huomiota erityisesti toteutuksen selkeyteen ja johdonmukaisuuteen.
