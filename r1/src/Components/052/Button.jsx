import CountContext from './CountContext';
import { useContext } from 'react';

export default function Button() {

    const { addOne } = useContext(CountContext);

    return (
        <button className="red" onClick={addOne}>ADD 1</button>
    );
}