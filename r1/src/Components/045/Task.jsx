import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BlackSq from './BlackSq';

export default function Task() {


    const [square, setSquare] = useState([]);

    const add = _ => {
        setSquare([...square, { id: uuidv4(), digit: 0 }]);
    }

    const plus = id => {
        setSquare(square.map(sq => sq.id === id ? { ...sq, digit: sq.digit + 1 } : sq));
    }

    return (
        <>
            <div className="sq-bin">
                {
                    square.map(sq => <BlackSq key={sq.id} sq={sq} plus={plus} />)
                }
            </div>
            <button className="red" onClick={add}>Add Black Square</button>
        </>
    );



}