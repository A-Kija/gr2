import { useContext } from 'react';
import Context123 from './Context123';
import CountContext from './CountContext';
import ContextABC from './ContexABC';

export default function C({ count1 }) {

    const { count2 } = useContext(Context123);
    const { count } = useContext(CountContext);

    return (
        <div className="com">
            <h2>C</h2>
            <p>Count1: {count1}</p>
            <p>Count2: {count2}</p>
            <p style={{color:'crimson'}}>Count: {count}</p>
            <p>Text:
                <ContextABC.Consumer>
                    {({ text }) => <span>{text}</span>}
                </ContextABC.Consumer>
            </p>
        </div>
    );
}