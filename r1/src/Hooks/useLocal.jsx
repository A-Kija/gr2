import { useState } from 'react';

export default function useLocal(initialValue) {

    const key = 'count';

    const [value, setValue] = useState(_ => {
        const savedValue = localStorage.getItem(key);
        return savedValue !== null ? JSON.parse(savedValue) : initialValue;
    });

    const add1 = _ => {
        setValue(c => {
            const newValue = c + 1;
            localStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    };

    const reset = _ => {
        setValue(initialValue);
        localStorage.setItem(key, JSON.stringify(initialValue));
    }


    return { value, add1, reset };
}