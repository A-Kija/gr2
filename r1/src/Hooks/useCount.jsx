import { useState } from 'react';

export default function useCount(initialCount) {

    const [count, setCount] = useState(initialCount);

    const add1 = _ => {
        setCount(c => c + 1);
    };

    const rem1 = _ => {
        setCount(c => c - 1);
    };

    return [ count, add1, rem1 ];

}