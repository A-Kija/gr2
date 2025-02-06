import './buttons.scss';
import './crud.scss';
import Create from './Components/crud/Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './Components/crud/constants';


export default function App() {

    const [storeData, setStoreData] = useState(null);




    useEffect(_ => {
        if (null === storeData) {
            return;
        }
        axios.post(C.serverUrl, storeData)
            .then(res => {
                console.log(res.data);
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
                    List
                </div>
            </div>
        </div>
    );
}