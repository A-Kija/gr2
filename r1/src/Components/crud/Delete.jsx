
export default function Delete({ setDeleteData, deleteData, setDestroyData }) {

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm planet destroy</h5>
                        <button type="button" className="btn-close" onClick={_ => setDeleteData(null)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to destroy <b>{deleteData.name}</b> planet with {deleteData.satellites.length} satelites?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="blue" onClick={_ => setDeleteData(null)}>Cancel</button>
                        <button type="button" className="red" onClick={_ => setDestroyData(deleteData)}>Destroy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}