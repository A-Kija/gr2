export default function Sq({ sq, removeSq, toggleRotate }) {

    return (
        <div
            className={'sq' + (sq.rotate ? ' rotate' : '')}
            style={{
                backgroundColor: sq.color + '60',
                border: '1px solid ' + sq.color
            }}
            onDoubleClick={_ => removeSq(sq.id)}
            onClick={_ => toggleRotate(sq.id)}
        >
            {sq.digit}
        </div>
    );

}