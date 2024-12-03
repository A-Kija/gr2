console.log('011/o.js');




class PirmaKlase {

    constructor() {
        console.log('Sveiki is konstruktoriaus');
        this.skaicius = Math.random();
        this.tekstas = 'Labas';
    }

}


const pirmasObjektas = new PirmaKlase();
const antrasObjektas = new PirmaKlase();



console.log(pirmasObjektas.skaicius);

antrasObjektas.tekstas = 'Viso gero';


console.log(pirmasObjektas, antrasObjektas);

const p = {skaicius: 77};

console.log(p);