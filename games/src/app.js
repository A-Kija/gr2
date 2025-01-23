import Genre from './Genre';
import Game from './Game';


const main = document.querySelector('#main');

switch (main?.dataset?.page) {
    case 'games':
        new Game();
        break;
    case 'genres':
        new Genre();
        break;


    default:
        console.log('Tokio puslapio nėra');
        break;
}