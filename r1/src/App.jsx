import './buttons.scss';
import './crud.scss';
import Create from './Components/crud/Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './Components/crud/constants';
import List from './Components/crud/List';
import { v4 as uuid4 } from 'uuid';


export default function App() {

    // const [refreshTime, setRefreshTime] = useState(Date.now()); // timestamp

    const [planets, setPlanets] = useState(null);

    const [createData, setCreateData] = useState(null);
    const [storeData, setStoreData] = useState(null);

    useEffect(_ => {
        axios.get(C.serverUrl)
            .then(res => {
                setPlanets(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    useEffect(_ => {
        if (null === storeData) {
            return;
        }
        const id = uuid4();
        setPlanets(p => [{ ...storeData, id, temp: true }, ...p]);
        
        axios.post(C.serverUrl, storeData)
            .then(res => {
                if (res.data.success) {
                    setPlanets(p => p.map(planet => {
                        if (planet.id === id) {
                            delete planet.temp;
                            planet.id = res.data.id;
                        }
                        return planet;
                    }));
                }
            })
            .catch(error => {
                console.error(error);
                setCreateData(storeData);
                setPlanets(p => p.filter(planet => planet.id !== id));
            });

    }, [storeData]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Create setStoreData={setStoreData} createData={createData} />
                </div>
                <div className="col-8">
                    <List planets={planets} />
                </div>
            </div>
        </div>
    );
}