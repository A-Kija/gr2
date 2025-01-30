import './app.css';
import './buttons.scss';
import RandomNumber from './Components/042/RandomNumber';
import randColor from './Functions/randColor';
import rand from './Functions/rand';
// import Bebras from './Components/042/Bebras';
// import A from './Components/042/A';


export default function App() {

    const goGreen = _ => {
        console.log('Go Green!');
    }

    const goBlue = nr => {
        console.log('Go Blue!', nr);
    }

    const goRed = e => {
        console.log('Go Red!', e.target);
    }

    const goYellow = (e, nr) => {
        console.log('Go Yellow!', nr, e.target);
    }
 

    const pvz = _ => goBlue(3);

    
    return (
        <div className="App">
            <header className="App-header">
                <h2 style={{
                    color: randColor(),
                    fontSize: rand(0, 1) ? '20px' : '60px',
                    marginBottom: rand(1, 3) * 20 + 'px'
                }}>Random number:</h2>
                <RandomNumber />
                {/* <Bebras spalva="crimson" dydis={rand} />
                <Bebras spalva="green" dydis={rand} />
                <Bebras spalva="purple" dydis={rand} />
                <A kasNors="Hello Africa!" /> */}
                <button className="green" onClick={goGreen}>Green</button>
                <button className="blue" onClick={_ => goBlue(1)}>Blue 1</button>
                <button className="blue" onClick={_ => goBlue(2)}>Blue 2</button>
                <button className="blue" onClick={pvz}>Blue 3</button>
                <button className="red" onClick={goRed}>Red</button>
                <button className="yellow" onClick={e => goYellow(e, 1)}>Yellow 1</button>
                <button className="yellow" onClick={e => goYellow(e, 2)}>Yellow 2</button>
            </header>
        </div>
    );
}

//1. spalvą padaryti atsitiktinę panaudoti funkciją randColor()
//2. dydį padaryti atsitiktinį: arba 20px arba 60px. Panaudoti funkciją rand()
//3. marginBottom padaryti atsitiktinį arba 20px arba 40px arba 60px. Panaudoti funkciją rand()
//4. Bebras komponento dydį skaičiuoti atsitiktinai Bebro komponento viduje nuo 20px iki 80px. rand funkciją pasiimti iš App komponento kaip propsą.