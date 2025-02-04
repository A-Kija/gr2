import { useState } from 'react';

export default function Checkbox() {

    const [check, setCheck] = useState(false);

    const hanleMyBox = _ => {
        setCheck(c => !c);
    }

    return (
        <fieldset >
            <legend>Checkbox</legend>
            <div>
                <label htmlFor="rules1">Ar sutinkate su taisyklėmis?</label>
                <input id="rules1" type="checkbox" checked={check} onChange={hanleMyBox} />
            </div>
        </fieldset>
    );
}