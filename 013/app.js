

class TV {

    static kanalai = ['LRT', 'TV3', 'LNK', 'TV6', 'BTV', 'TV1'];

    static televizoriai = [];

    static pridetiNaujaKanala(naujasKanalas) {
        this.kanalai.push(naujasKanalas);
    }

    constructor(savininkas) {
        this.savininkas = savininkas;
        this.kanalas = 1;
        this.constructor.televizoriai.push(this);
    }

    perjungtiKanala(naujasKanalas) {
        this.kanalas = naujasKanalas;
    }

    pridetiNaujaKanalaVisiems(naujasKanalas) {
        this.constructor.pridetiNaujaKanala(naujasKanalas);
    }

    rodytiKanala() {
        console.log(`${this.savininkas} žiūri ${this.constructor.kanalai[this.kanalas - 1]} kanalą.`);
    }
}


const televizorius1 = new TV('Kazys');
const televizorius2 = new TV('Marytė');
const televizorius3 = new TV('Bebras');

const naujiKanalai = ['Sport8', 'TV3', 'LNK', 'TV6', 'BTV', 'TV1'];

TV.kanalai = naujiKanalai;

TV.pridetiNaujaKanala('Super Sport 10');

televizorius2.pridetiNaujaKanalaVisiems('Super Sport Turbo');



// televizorius1.kanalai = naujiKanalai;
// televizorius2.kanalai = naujiKanalai;
// televizorius3.kanalai = naujiKanalai;

televizorius1.perjungtiKanala(8);



televizorius1.rodytiKanala();
televizorius2.rodytiKanala();
televizorius3.rodytiKanala();