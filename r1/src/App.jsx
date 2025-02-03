import './app.scss';
import './buttons.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import rand from './Functions/rand';
import randColor from './Functions/randColor';
import Sq from './Components/044/Sq';


export default function App() {

    const [sq, setSq] = useState([]);


    // const doWithFor = _ => {
    //     let arr = [];
    //     for (let i = 0; i < sq.length; i++) {
    //         arr.push(<div key={i} className="sq"></div>);
    //     }
    //     console.log(arr);
    //     return arr;
    // }

    // const el9 = doWithFor();

    const addSq = _ => {
        setSq(prev => [...prev, {
            digit: rand(1000, 9999),
            id: uuidv4(),
            color: randColor()
        }]);
    }

    const reset = _ => setSq([]);

    const add20Sq = _ => {
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push({
                digit: rand(1000, 9999),
                id: uuidv4(),
                color: randColor()
            });
        }
        setSq(prev => [...prev, ...arr]);
    }



    return (
        <div className="App">
            <header className="App-header">

                <div className='sq-bin'>
                    {
                        sq.map(s => <Sq key={s.id} sq={s} />)
                    }
                </div>
                <div className='sq-bin'>
                    <button className="green" onClick={addSq}>Add</button>
                    <button className="red" onClick={reset}>Reset</button>
                    <button className="yellow" onClick={add20Sq}>Add 20</button>
                </div>




            </header>
        </div>
    );
}


