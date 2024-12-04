class Kibiras1 {
    constructor() {
        this.akmenuKiekis = 0;
    }

    prideti1Akmeni() {
        this.akmenuKiekis++;
    }

    pridetiDaugAkmenu(kiekis) {
        this.akmenuKiekis += kiekis;
    }

    kiekPririnktaAkmenu() {
        console.log(`%cAkmenų kiekis: ${this.akmenuKiekis}`, 'color: green; font-size: 20px;');
    }
}

const kibiras1 = new Kibiras1();
kibiras1.prideti1Akmeni();
kibiras1.prideti1Akmeni();
kibiras1.prideti1Akmeni();
kibiras1.pridetiDaugAkmenu(5);

kibiras1.kiekPririnktaAkmenu();

class Pinigine {

    constructor() {
        this.popieriniaiPinigai = 0;
        this.metaliniaiPinigai = 0;
    }

    ideti(pinigai) {
        if (pinigai <= 2) {
            this.metaliniaiPinigai += pinigai;
        } else {
            this.popieriniaiPinigai += pinigai;
        }
    }

    skaiciuoti() {
        console.log(`%cPopieriniu pinigu: ${this.popieriniaiPinigai}, metaliniu pinigu: ${this.metaliniaiPinigai}, viso: ${this.popieriniaiPinigai + this.metaliniaiPinigai}`, 'color: pink; font-size: 20px;');
    }
}

const pinigine = new Pinigine();
pinigine.ideti(1);
pinigine.ideti(2);
pinigine.ideti(5);
pinigine.ideti(10);
pinigine.ideti(20);

pinigine.skaiciuoti();


class Troleibusas {

    constructor() {
        this.keleiviuSkaicius = 0;
    }

    ilipa(keleiviuSkaicius) {
        this.keleiviuSkaicius += keleiviuSkaicius;
    }

    islipa(keleiviuSkaicius) {
        const islipo = Math.min(this.keleiviuSkaicius, keleiviuSkaicius);
        this.keleiviuSkaicius -= islipo;

        // Math.min(10, 30); => 10 => 10 - 10 = 0
        // Math.min(25, 5); => 5 => 25 - 5 = 20
    }

    vaziuoja() {
        console.log(`%cKeleiviu skaicius: ${this.keleiviuSkaicius}`, 'color: pink; font-size: 20px;');
    }

}

const troleibusas = new Troleibusas();
troleibusas.ilipa(5);
troleibusas.ilipa(5);

troleibusas.islipa(20);

troleibusas.vaziuoja();