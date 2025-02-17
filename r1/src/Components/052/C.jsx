import { useContext } from 'react';
import Context123 from './Context123';
import ContextABC from './ContexABC';

export default function C({ count1 }) {

    const { count2 } = useContext(Context123);
    const  { text } = useContext(ContextABC);

    return (
        <div className="com">
            <h2>C</h2>
            <p>Count1: {count1}</p>
            <p>Count2: {count2}</p>
            <p>Text: {text}</p>
        </div>
    );
}