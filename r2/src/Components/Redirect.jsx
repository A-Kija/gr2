import { useEffect } from 'react';

export default function Redirect({ to }) {

    useEffect(_ => {
        window.location.assign('#' + to); // nebūtinai naudoti assign
    }, []);
    return null;
}