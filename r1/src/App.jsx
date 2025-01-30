import './app.css';
import './buttons.scss';
import A from './Components/043/A';
import B from './Components/043/B';
import {useState} from 'react';
import C from './Components/043/C';


export default function App() {

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    
    return (
        <div className="App">
            <header className="App-header">

                <A count1={count1}/>
                <button className="green" onClick={_ => setCount1(c => c + 1)}>+1</button>
                
                <B count2={count2}/>
                <button className="blue" onClick={_ => setCount2(c => c + 1)}>+1</button>

                <h2>Count: {count3} </h2>
                <C setCount3={setCount3} />

     
            </header>
        </div>
    );
}


//1. Sukurti naują React komponentą A ir įdėti į APP. Sukurti mygtuką ir steitą, kuriame yra skaičius, kuris didėja vienetu. Skaičių atvaizduot komponente A.
//2. Sukurti naują React komponentą B ir įdėti į APP. Sukurti mygtuką ir steitą, kuriame yra skaičius, kuris didėja trejetu. Skaičių atvaizduot komponente B.

//3. Sukurti naują React komponentą C ir įdėti į APP. Jame pridėti mygtuką, kurį paspaudus padidėja skaičius vienetu. Skaičių atvaizduoti komponente APP.
