import B from './B';

export default function A({kasNors}) {

    return (
        <div style={{
            margin: '20px',
            padding: '20px',
            border: 'solid 2px white'
        }}>
            <B kasNors={kasNors} />
        </div>
    );
}