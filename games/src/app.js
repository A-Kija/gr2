import Genre from './Genre';


const main = document.querySelector('#main');

switch (main?.dataset?.page) {
    case 'games':
        
        break;
    case 'genres':
        new Genre();
        break;
    default:
        console.log('Tokio puslapio nėra');
        break;
}