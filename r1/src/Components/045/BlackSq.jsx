export default function BlackSq({ sq, plus }) {

    return (
        <div className="sq black">
            <span>{sq.digit}</span>
            <button className="red" onClick={_ => plus(sq.id)}>+</button>
        </div>
    );


}