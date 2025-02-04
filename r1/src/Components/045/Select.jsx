import { useState } from 'react';

export default function Select() {

    const options = [
        { value: 'volvo', label: 'Volvo' },
        { value: 'saab', label: 'Saab' },
        { value: 'mercedes', label: 'Mercedes' },
        { value: 'audi', label: 'Audi' }
    ];
    
    const [select, setSelect] = useState('saab');

    const handleMySelect = e => {
        setSelect(e.target.value);
        console.log(options[e.target.selectedIndex].label);
    }

    return (
        <fieldset>
            <legend>Select</legend>
            <div>
                <label>Pasirnk mašiną</label>
                <select value={select} onChange={handleMySelect}>
                    {
                        options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)
                    }
                </select>
            </div>
        </fieldset>
    );
}