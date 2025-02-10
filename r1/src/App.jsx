import './buttons.scss';
import './crud.scss';
import Create from './Components/crud/Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './Components/crud/constants';
import List from './Components/crud/List';


export default function App() {

    const [refreshTime, setRefreshTime] = useState(Date.now()); // timestamp

    const [planets, setPlanets] = useState(null);
    const [storeData, setStoreData] = useState(null);

    useEffect(_ => {
        axios.get(C.serverUrl)
            .then(res => {
                setPlanets(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [refreshTime]);


    useEffect(_ => {
        if (null === storeData) {
            return;
        }
        axios.post(C.serverUrl, storeData)
            .then(res => {
                setRefreshTime(Date.now());
            })
            .catch(error => {
                console.error(error);
            });

    }, [storeData]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Create setStoreData={setStoreData} />
                </div>
                <div className="col-8">
                    <List planets={planets} />
                </div>
            </div>
        </div>
    );
}