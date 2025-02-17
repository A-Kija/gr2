import C from './C';
import { useContext } from 'react';
import Context123 from './Context123';

export default function B({ count1 }) {

const { count2 } = useContext(Context123);

    return (
        <div className="com">
            <h2>B</h2>
            <p>Count2: {count2}</p>
            <C count1={count1} />
        </div>
        
    );
}