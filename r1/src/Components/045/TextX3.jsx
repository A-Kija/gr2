import { useState } from 'react';

export default function TextX3() {

    const [texts, setTexts] = useState({ vardas: '', pavarde: '', amzius: '' });

    const handleMyInputs = e => {
        setTexts(t => ({ ...t, [e.target.name]: e.target.value }));
    }

    return (
        <fieldset>
            <legend>3 X Texts</legend>
            <div>
                <label>Vardas</label>
                <input type="text" value={texts.vardas} name="vardas" onChange={handleMyInputs} />
            </div>
            <div>
                <label>Pavardė</label>
                <input type="text" value={texts.pavarde} name="pavarde" onChange={handleMyInputs} />
            </div>
            <div>
                <label>Amžius</label>
                <input type="text" value={texts.amzius} name="amzius" onChange={handleMyInputs} />
            </div>
        </fieldset>
    );
}