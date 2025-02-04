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
            color: randColor(),
            show: true,
            row: prev.length
        }]);
    }

    const reset = _ => setSq([]);

    const add20Sq = _ => {
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push({
                digit: rand(1000, 9999),
                id: uuidv4(),
                color: randColor(),
                show: true,
                row: sq.length + i
            });
        }
        setSq(prev => [...prev, ...arr]);
    }

    const sortByDigits = _ => {
        setSq(prev => prev.toSorted((a, b) => a.digit - b.digit));
    }

    const filterMore5000 = _ => {
        setSq(prev => prev.map(s => ({ ...s, show: s.digit > 5000 })));
    }

    const showAll = _ => {
        setSq(prev => prev.map(s => ({ ...s, show: true })));
    }

    const sortDefault = _ => {
        setSq(prev => prev.toSorted((a, b) => a.row - b.row));
    }

    const removeSq = id => {
        setSq(prev => prev.filter(s => s.id !== id));
    }

    const toggleRotate = id => {
        setSq(prev => prev.map(s => {
            if (s.id !== id) {
                return s;
            }
            if (s.rotate) {
                delete s.rotate;
            } else {
                s.rotate = true;
            }
            return s;
        }));
    }


    const rotateAll = _ => {
        sq.forEach(s => {
            setTimeout(_ => {
                setSq(prev => prev.map(sq => {
                    if (sq.id !== s.id) {
                        return sq;
                    }
                    s.rotate = true;
                    return sq;
                }))
            }, rand(0, 5000));
        });


    }



    return (
        <div className="App">
            <header className="App-header">

                <div className='sq-bin'>
                    {
                        sq.map(s => s.show ? <Sq key={s.id} sq={s} removeSq={removeSq} toggleRotate={toggleRotate} /> : null)
                    }
                </div>
                <div className='sq-bin'>
                    <button className="green" onClick={addSq}>Add</button>
                    <button className="red" onClick={reset}>Reset</button>
                    <button className="yellow" onClick={add20Sq}>Add 20</button>
                    <button className="blue" onClick={sortByDigits}>Sort Digits</button>
                    <button className="green" onClick={sortDefault}>Sort Default</button>
                    <button className="blue" onClick={filterMore5000}>Show 5000</button>
                    <button className="green" onClick={showAll}>Show All</button>
                    <button className="green" onClick={rotateAll}>Rotate All</button>
                </div>




            </header>
        </div>
    );
}

//1. Padaryti mygtuką, kuris pradeda sukti visus kvadratus


