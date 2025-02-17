import './app.scss';
import './buttons.scss';
import { useState, useReducer } from 'react';
import count2Reducer from './Reducers/count2Reducer';
import * as A from './Actions/count2';

export default function App() {

    const [count1, setCount1] = useState(0);

    const [count2, dispatchCount2] = useReducer(count2Reducer, 10);

    const [inputValue, setInputValue] = useState(0);    

    const c1plus = _ => {
        setCount1(c => c + 1);
    }

    const c1minus = _ => {
        setCount1(c => c - 1);
    }

    


    return (
        <div className="App">
            <header className="App-header">
                <h1>COUNT 1: {count1}</h1>
                <div>
                    <button className="green" onClick={c1plus}>COUNT 1</button>
                    <button className="yellow" onClick={c1minus}>COUNT 1</button>
                </div>
                <h1>COUNT 2: {count2}</h1>
                <div>
                    <button className="green" onClick={_ => dispatchCount2(A.plus1())}>COUNT 2</button>
                    <button className="yellow" onClick={_ => dispatchCount2(A.minus1())}>COUNT 2</button>
                    <button className="blue" onClick={_ => dispatchCount2(A.plus5())}>COUNT 2</button>
                </div>
                <div>
                    <button className="red" onClick={_ => dispatchCount2(A.plusInput(inputValue))}>COUNT 2</button>
                    <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <button className="green" onClick={_ => dispatchCount2(A.multiInput(inputValue))}>COUNT 2</button>
                </div>
            </header>
        </div>
    );
}

// 1. Padaryti minusavimą 1 su useReducer
// 2. Padaryti pliusavimą 5 su useReducer
// 3. Padaryti pliusavimą su įvesties lauku (jau yra) su useReducer, kad daugintų iš pusės įvesties lauko reikšmės