import './app.scss';
import './buttons.scss';
import rand from './Functions/rand';
import Sq from './Components/046/Sq';
import { useEffect, useState, useCallback, useRef } from 'react';
import randColor from './Functions/randColor';

export default function App() {

    const [sq, setSq] = useState([]);
    const [sqCount, setSqCount] = useState(0);
    const [color, setColor] = useState('yellow');
    const loaded = useRef(false);

    const add = _ => {
        setSq(s => [...s, rand(1000, 9999)]);
        // setSqCount(sq.length + 1); nelabai
    }

    const add2 = _ => {
        setSq(s => [...s, rand(1000, 9999), rand(1000, 9999)]);
        // setSqCount(sq.length + 2); nelabai
    }

    const myFun = useCallback(_ => {
        console.log('My fun');
    }, []);

    useEffect(_ => {
        console.log('App komponentas atnaujintas');
        // setSqCount(sq.length); nelabai
    });
    // šis efektas bus paleistas kiekvieną kartą, kai komponentas atnaujinamas
    // nelabai naudingas 

    useEffect(_ => {
        console.log('App komponentas užkrautas');
    }, []);
    // tuščias masyvas reiškia, kad šis efektas bus paleistas tik vieną kartą, kai komponentas užkraunamas

    useEffect(_ => {
        if (!loaded.current) {
            loaded.current = true;
            return;
        } // išvengiama pirmojo paleidimo, kai komponentas užkraunamas

        console.log('Kvadratukai atsinaujino');
        myFun();
        setSqCount(sq.length);

        // setSq(s => [...s, rand(1000, 9999)]);
        // Užsiciklinimas, nes šis efektas keičia kvadratukų masyvą, o kvadratukų masyvas kviečia efektą

    }, [sq, myFun]);
    // šis efektas bus paleistas kiekvieną kartą, kai atnaujinamas kvadratukų masyvas


    return (
        <div className="App">
            <header className="App-header">
                <h1 style={{ color: color }}>Hello, Vinted!</h1>

                <h1>Count: {sqCount}</h1>
                <div className="sq-bin">
                    {
                        sq.map((n, i) => <Sq key={i} num={n} />)
                    }
                </div>
                <button className="yellow" onClick={add}>Add</button>
                <button className="green" onClick={add2}>Add 2</button>
                <button className="red" onClick={_ => setColor(randColor())}>Change color</button>

            </header>
        </div>
    );
}

// 1. Keičiantis kvadratukų skaičiui reikia atnaujinti ir kvadratukų skaičių sqCount