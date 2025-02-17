import B from './B';

export default function A({ count1 }) {
    return (
        <div className="com">
            <h2>A</h2>
            <B count1={count1} />
        </div>
    );
}