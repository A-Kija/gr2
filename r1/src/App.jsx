import './app.scss';
import './buttons.scss';
import useCount from './Hooks/useCount';
import useLocal from './Hooks/useLocal';


export default function App() {

    const [ numeris, prideti1, atimti1 ] = useCount(0);
    const { value, add1, reset } = useLocal(0);

    return (

        <div className="App">
            <header className="App-header">
                <h2>Count: {numeris}</h2>
                <div className="buttons">
                    <button className="blue" onClick={prideti1}>Add 1</button>
                    <button className="red" onClick={atimti1}>Rem 1</button>
                </div>
                <h2>Local Value: {value}</h2>
                <div className="buttons">
                    <button className="blue" onClick={add1}>Add 1</button>
                    <button className="red" onClick={reset}>Reset</button>
                </div>
            </header>
        </div>


    );
}


// Pagaminti custom hooką, kuris saugotų skaičių būseną local storage'e
// ir turėtų galimybę ją didinti vienetu arba padaryti nuliu.

