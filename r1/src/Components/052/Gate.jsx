export default function Gate({ children, open }) {
    return (
        <div className="gate">
            {open ? children : <h3>Užrakinta</h3>}
        </div>
    );
}