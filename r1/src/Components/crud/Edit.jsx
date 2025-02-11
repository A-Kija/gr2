import { useEffect, useState } from 'react';
import * as C from './constants';

export default function Edit({ setEditData, editData, setUpdateData }) {

    const [satellites, setSatellites] = useState([]);
        const [planet, setPlanet] = useState(C.defaultPlanet);
    
        useEffect(_ => {
            if (null === editData) {
                return;
            }
            setPlanet({
                color_hex: '#' + editData.color_hex,
                name: editData.name,
                size: editData.size
            });
            setSatellites(editData.satellites);
        }, [editData]);
    
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
    
        const submit = _ => {
            setUpdateData({
                color_hex: planet.color_hex.replace('#', ''),
                name: planet.name,
                size: parseInt(planet.size),
                satellites,
                id: editData.id
            });
            setEditData(null);
        }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update planet data</h5>
                        <button type="button" className="btn-close" onClick={_ => setEditData(null)}></button>
                    </div>
                    <div className="modal-body">
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
                    <input type="color" name="color_hex" onChange={handlePlanet} className="form-control form-control-color" value={planet.color_hex} />
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
                    <div className="modal-footer">
                        <button type="button" className="blue" onClick={_ => setEditData(null)}>Close</button>
                        <button type="button" className="green" onClick={submit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}