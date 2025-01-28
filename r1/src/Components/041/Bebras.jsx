export default function Bebras() {

    let A = 3;

    const abc = _ => {
        return <h3>Labas</h3>
    }

    return (
        <>
            <h2>Bebras</h2>
            <span>Jam yra {A > 5 ? <span>daug</span> : <span>mažai</span>} metų</span>
            {abc()}
        </>
    );

}