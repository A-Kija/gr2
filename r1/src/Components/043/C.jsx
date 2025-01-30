export default function C({setCount3}) {

    return (
        
        <button className="red" onClick={_ => setCount3(c => c + 1)}>+1</button>
    );

}