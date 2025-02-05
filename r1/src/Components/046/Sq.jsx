import { useEffect } from 'react';

export default function Sq({ num }) {

    useEffect(_ => {
        console.log('Naujas kvaratukas');
        return _ => {
            console.log('Kvadratukas sunaikintas');
        }
    }, []);


    return (
        <div className="sq">
            {num}
        </div>
    );
}