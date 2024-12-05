console.log('nd.js');

class Troleibusas {

    static visiKeleiviai = 0;

    static bendrasKeleiviuSkaicius(keleiviuSkaicius) {
        this.visiKeleiviai += keleiviuSkaicius;
    }

    constructor() {
        this.keleiviuSkaicius = 0;
    }

    ilipa(keleiviuSkaicius) {
        this.keleiviuSkaicius += keleiviuSkaicius;
        this.constructor.bendrasKeleiviuSkaicius(keleiviuSkaicius);
    }

    islipa(keleiviuSkaicius) {
        const islipo = Math.min(this.keleiviuSkaicius, keleiviuSkaicius);
        this.keleiviuSkaicius -= islipo;
        this.constructor.bendrasKeleiviuSkaicius(-islipo);
    }

    keleiviuSkaiciusVisuoseTroleibusuose() {
        return console.log(`Visuose troleibusuose yra ${this.constructor.visiKeleiviai} keleiviai.`);
    }

    keleviuSkaiciusTroleibuse() {
        return console.log(`Troleibuseje yra ${this.keleiviuSkaicius} keleiviai.`);
    }

}

const troleibusas1 = new Troleibusas();
const troleibusas2 = new Troleibusas();
const troleibusas3 = new Troleibusas();

troleibusas1.ilipa(10);
troleibusas1.ilipa(5);
troleibusas1.islipa(2);

troleibusas2.ilipa(10);
troleibusas2.ilipa(5);
troleibusas2.islipa(2);

troleibusas3.ilipa(10);
troleibusas3.ilipa(5);
troleibusas3.islipa(2);

troleibusas1.keleiviuSkaiciusVisuoseTroleibusuose();
troleibusas2.keleviuSkaiciusTroleibuse();


class PirkiniuKrepselis {

    constructor() {
        this.turinys = new Map();
    }

    #idetiProdukta(produktas, kiekis) {
        if (this.turinys.has(produktas)) {
            this.turinys.set(produktas, this.turinys.get(produktas) + kiekis);
        } else {
            this.turinys.set(produktas, kiekis);
        }
    }

    idetiSureli(kiekis) {
        this.#idetiProdukta('surelis', kiekis);
    }

    idetiPieno(kiekis) {
        this.#idetiProdukta('pienas', kiekis);
    }

    idetiDuonos(kiekis) {
        this.#idetiProdukta('duona', kiekis);
    }

    krepselioTurinys() {
        console.log('Krepselio turinys:');
        this.turinys.forEach((kiekis, produktas) => {
            console.log(`${produktas}: ${kiekis} vnt.`);
        });
    }


}

const krepselis = new PirkiniuKrepselis();

krepselis.idetiSureli(2);
krepselis.idetiPieno(1);
krepselis.idetiDuonos(3);
krepselis.idetiSureli(2);
krepselis.idetiPieno(1);
krepselis.idetiDuonos(3);

krepselis.krepselioTurinys();

class Pinigine2 {

    constructor() {
        this.popieriniaiPinigai = [];
        this.metaliniaiPinigai = [];
    }

    ideti(kiekis) {
        if (kiekis > 2) {
            this.popieriniaiPinigai.push(kiekis);
        } else {
            this.metaliniaiPinigai.push(kiekis);
        }
    }

    banknotai() {
        console.log('Popieriniai pinigai:');
        const suma = this.popieriniaiPinigai.reduce((total, kiekis) => total + kiekis, 0);
        const banknotai = this.popieriniaiPinigai.length;
        console.log(`Popieriniu pinigu suma: ${suma} Eur.`);
        console.log(`Popieriniu pinigu skaicius: ${banknotai}`);
    }

    monetos() {
        console.log('Metaliniai pinigai:');
        const suma = this.metaliniaiPinigai.reduce((total, kiekis) => total + kiekis, 0);
        const monetos = this.metaliniaiPinigai.length;
        console.log(`Metaliniu pinigu suma: ${suma} Eur.`);
        console.log(`Metaliniu pinigu skaicius: ${monetos}`);
    }
}

const pinigine2 = new Pinigine2();

pinigine2.ideti(1);
pinigine2.ideti(2);
pinigine2.ideti(5);
pinigine2.ideti(10);
pinigine2.ideti(20);

pinigine2.banknotai();
pinigine2.monetos();
