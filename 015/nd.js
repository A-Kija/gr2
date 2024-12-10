console.log('015/nd.js');


class Stikline {

    constructor(turis) {
        this.turis = turis;
        this.kiekis = 0;
    }

    ipilti(kiekis) {
        this.kiekis = Math.min(this.turis, this.kiekis + kiekis);
        return this;
    }

    ispilti() {
        const kiekis = this.kiekis;
        this.kiekis = 0;
        return kiekis;
    }

    stiklinejeYra() {
        return console.log(`Stiklineje yra ${this.kiekis} iki ${this.turis}`);
    }

}

const s200 = new Stikline(200);
const s150 = new Stikline(150);
const s100 = new Stikline(100);

s100.ipilti(s150.ipilti(s200.ipilti(500).ispilti()).ispilti());

s200.stiklinejeYra();
s150.stiklinejeYra();
s100.stiklinejeYra();


class Grybas {

    constructor() {
        this.valgomas = !this.#rand(0, 1);
        this.sukirmijes = !this.#rand(0, 1);
        this.svoris = this.#rand(5, 45);
    }

    #rand(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

}

class Krepsys {
   
    constructor() {
        this.prikrauta = 0;
        this.dydis = 500;
    }

    pridetiGryba(grybas) {
        if (grybas.valgomas && !grybas.sukirmijes) {
            this.prikrauta += grybas.svoris;
        }
        return this.dydis >= this.prikrauta;  // Jeigu pilnas grazina false
    }

}

// Gintare

const krepsys = new Krepsys();

while (krepsys.pridetiGryba(new Grybas())){}

console.log(krepsys);