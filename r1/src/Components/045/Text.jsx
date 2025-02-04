import { useState } from 'react';

export default function Text() {

    const [text, setText] = useState('');

    const handleMyInput = e => {
        setText(e.target.value);
    }

    return (
        <fieldset>
            <legend>Text</legend>

            <input type="text" value={text} onChange={handleMyInput} />

        </fieldset>
    );
}