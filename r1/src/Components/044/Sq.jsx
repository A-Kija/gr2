export default function Sq({ sq }) {

    return (
        <div
            className="sq"
            style={{
                backgroundColor: sq.color + '60',
                border: '1px solid ' + sq.color
            }}
        >
            {sq.digit}
        </div>
    );

}