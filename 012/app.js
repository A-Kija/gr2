console.log('Hello from app.js');

// Rašo Aivaras

class TV {

    #kanalas = 1; // private
    #ijungta = false; // private
    #modelis; // private

    constructor(savininkas, modelis) {
        this.savininkas = savininkas; // public
        this.#modelis = modelis || 'LG'; // private
        this.dulkes = 0; // public
    }

    koksKanalas() {
        if (!this.#ijungta) {
            this.#isvestiInformacija('TV išjungtas. Savininkas: ' + this.savininkas);
            return;
        }
        this.#isvestiInformacija('Kanalas ' + this.#kanalas + ', o savininkas: ' + this.savininkas);
    }

    kanaloNumeris() { // getter
        return this.#kanalas;
    }

    keistiKanala(kanalas) { // setter
        if (!this.#ijungta) {
            this.#ijungta = true;
            console.log('TV įjungtas. Savininkas: ' + this.savininkas);
        }
        if (kanalas < 1 || kanalas > 100) {
            console.log('Toks kanalas negalimas. Savininkas: ' + this.savininkas);
            return;
        }
        this.#kanalas = kanalas;
    }

    ijungtiIsjungti() {
        this.#ijungta = !this.#ijungta;
        console.log('TV yra ' + (this.#ijungta ? 'įjungtas' : 'išjungtas') + '. Savininkas: ' + this.savininkas);
    }


    #isvestiInformacija(informacija) {
        console.log('%c' + informacija, 'color: green; font-size: 12px;');
    }


}



// Rašo Gintarė


const tv1 = new TV('Kazys', 'Sony');
const tv2 = new TV('Ona');
const tv3 = new TV('Bebras', 'Sony');


console.log(tv1, tv2, tv3);

tv2.ijungtiIsjungti();


tv1.koksKanalas();
tv2.koksKanalas();
tv3.koksKanalas();

console.clear();


class Padangos {

    constructor() {
        this.padangos = ['vasarines', 'ziemines'];
    }

}



class Automobilis extends Padangos {

    constructor(savininkas) {
        super();
        this.savininkas = savininkas;
        this.kuroKiekis = 0;
    }

    vaziuoja() {
        console.log('Automobilis važiuoja. Savininkas: ' + this.savininkas);
    }

    stabdo() {
        console.log('Automobilis stabdo. Savininkas: ' + this.savininkas);
    }

    piltiKura(kiekis) {
        this.kuroKiekis += kiekis;
        console.log('Pilamas kuras: ' + kiekis + ' l. Savininkas: ' + this.savininkas);
    }

}

class Opel extends Automobilis {
    
    constructor(savininkas, duruSkaicius) {
        super(savininkas);
        this.duruSkaicius = duruSkaicius || 4;
    }

    opelioZaibas() {
        console.log('Opel žaibuoja. Savininkas: ' + this.savininkas);
    }
}


class Volvo extends Automobilis {
    
    
    constructor(savininkas) {
        super(savininkas);
        this.padangos.push('universalios');
    }

    vaziuoja() {
        console.log('Volvo važiuoja. Savininkas: ' + this.savininkas);
    }

    volvoBriedis() {
        console.log('Bėga Volvo briedis. Savininkas: ' + this.savininkas);
    }
}


const opel = new Opel('Kazys');
const volvo = new Volvo('Ona');

opel.opelioZaibas();
volvo.volvoBriedis();

opel.vaziuoja();
volvo.vaziuoja();

console.log(opel, volvo);