import './app.css';
import RandomNumber from './Components/042/RandomNumber';
import randColor from './Functions/randColor';
import rand from './Functions/rand';
import Bebras from './Components/042/Bebras';


export default function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h2 style={{
                    color: randColor(),
                    fontSize: rand(0, 1) ? '20px' : '60px',
                    marginBottom: rand(1, 3) * 20 + 'px'
                }}>Random number:</h2>
                <RandomNumber />
                <Bebras spalva="crimson" dydis="10px" />
                <Bebras spalva="green" dydis="20px" />
                <Bebras spalva="purple" dydis="31px" />
            </header>
        </div>
    );
}

//1. spalvą padaryti atsitiktinę panaudoti funkciją randColor()
//2. dydį padaryti atsitiktinį: arba 20px arba 60px. Panaudoti funkciją rand()
//3. marginBottom padaryti atsitiktinį arba 20px arba 40px arba 60px. Panaudoti funkciją rand()
//4. Bebras komponento dydį skaičiuoti atsitiktinai Bebro komponento viduje nuo 20px iki 80px. rand funkciją pasiimti iš App komponento kaip propsą.