import { useState } from 'react';
import * as C from './constants';

export default function Create() {

    const [satellites, setSatellites] = useState([]);
    const [planet, setPlanet] = useState(C.defaultPlanet);

    const handlePlanet = e => {
        setPlanet({ ...planet, [e.target.name]: e.target.value });
    }

    const addSat = _ => {
        setSatellites(s => ['', ...s]);
    }

    const remSat = index => {
        setSatellites(s => s.filter((_, i) => i !== index));
    }

    const handleSatellite = (e, index) => {
        setSatellites(s => s.map((sat, i) => i === index ? e.target.value : sat));
    }

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h2>Discover new planet</h2>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Planet name</label>
                    <input type="text" name="name" className="form-control" onChange={handlePlanet} value={planet.name} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Planet size <b>{planet.size} km</b></label>
                    <input type="range" name="size" className="form-range" onChange={handlePlanet} min={100} max={200000} value={planet.size} />
                </div>
                <div className="mb-3">
                    <label className="form-label">What color</label>
                    <input type="color" name="hex-color" onChange={handlePlanet} className="form-control form-control-color" value={planet.colorHex} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Satellites</label>
                    {
                        satellites.map((satellite, index) => (
                            <div className="form-add" key={index}>
                                <input type="text" name="satellite" className="form-control" onChange={e => handleSatellite(e, index)} value={satellite} />
                                <button className="red" onClick={_ => remSat(index)}>-</button>
                            </div>
                        ))
                    }
                </div>
                <button className="blue" onClick={addSat}>+</button>
            </div>
            <div className="card-footer">
                <button className="green">Add to catalog</button>
            </div>
        </div>
    );

}