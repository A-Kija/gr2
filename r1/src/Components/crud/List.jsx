export default function List({ planets, setEditData, setDeleteData }) {

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h2>Planets List</h2>
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {
                        planets !== null
                            ? planets.map(planet => (
                                <li key={planet.id} className="list-group-item" style={{
                                    backgroundColor: planet.temp ? '#f8d7da' : 'white'
                                }}>
                                    <div className="row">
                                        <div className="col-3 planet-name">{planet.name}</div>
                                        <div className="col-2 planet-size">{planet.size} km</div>
                                        <div className="col-1 planet-color">
                                            <span style={{ backgroundColor: `#${planet.color_hex}` }}></span>
                                        </div>
                                        <div className="col-2 sat-list">
                                            {
                                                planet.satellites.length
                                                    ? planet.satellites.map((sat, index) => (
                                                        <span key={index}>{sat}</span>
                                                    ))
                                                    : <div>None</div>
                                            }
                                        </div>
                                        <div className="col-4 actions">
                                            <button className="red" disabled={!!planet.temp} onClick={_ => setDeleteData(planet)}>Delete</button>
                                            <button className="green" disabled={!!planet.temp} onClick={_ => setEditData(planet)}>Edit</button>
                                        </div>
                                    </div>
                                </li>)
                            )
                            : <li className="list-group-item">Planets loading...</li>
                    }
                </ul>
            </div>

            <div className="card-footer">

            </div>
        </div>
    );
}