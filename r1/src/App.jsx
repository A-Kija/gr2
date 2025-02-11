import './buttons.scss';
import './crud.scss';
import Create from './Components/crud/Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as C from './Components/crud/constants';
import List from './Components/crud/List';
import { v4 as uuid4 } from 'uuid';
import Edit from './Components/crud/Edit';
import Delete from './Components/crud/Delete';
import Messages from './Components/crud/Messages';


export default function App() {

    // const [refreshTime, setRefreshTime] = useState(Date.now()); // timestamp

    const [planets, setPlanets] = useState(null);

    const [createData, setCreateData] = useState(null);
    const [storeData, setStoreData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [destroyData, setDestroyData] = useState(null);
    const [messages, setMessages] = useState([]);

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


    useEffect(_ => {
        if (null === updateData) {
            return;
        }
        const id = updateData.id;
        delete updateData.id;

        setPlanets(p => p.map(planet => {
            if (planet.id === id) {
                return { ...planet, ...updateData, temp: true, copy: { ...planet } };
            }
            return planet;
        }));

        axios.put(C.serverUrl + id, { ...updateData })
            .then(res => {
                if (res.data.success) {
                    setPlanets(p => p.map(planet => {
                        if (planet.id === id) {
                            delete planet.temp;
                            delete planet.copy;
                        }
                        return planet;
                    }));
                }
            })
            .catch(error => {
                console.error(error);
                setPlanets(p => p.map(planet => {
                    if (planet.id === id) {

                        return { ...planet.copy };
                    }
                    return planet;
                }
                ));
                setEditData({ ...updateData, id });
            });

    }, [updateData]);


    useEffect(_ => {
        if (null === destroyData) {
            return;
        }
        const id = destroyData.id;

        setDeleteData(null);

        setPlanets(p => p.map(planet => {
            if (planet.id === id) {
                return { ...planet, temp: true};
            }
            return planet;
        }));

        axios.delete(C.serverUrl + id)
            .then(res => {
                if (res.data.success) {
                    setPlanets(p => p.filter(planet => planet.id !== id));
                }
            })
            .catch(error => {
                console.error(error);

                setPlanets(p => p.map(planet => {
                    if (planet.id === id) {
                        delete planet.temp;
                    }
                    return planet;
                }));
  
            });

    }, [destroyData]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Create setStoreData={setStoreData} createData={createData} />
                    </div>
                    <div className="col-8">
                        <List planets={planets} setEditData={setEditData} setDeleteData={setDeleteData} />
                    </div>
                </div>
            </div>
            {editData !== null && <Edit setEditData={setEditData} editData={editData} setUpdateData={setUpdateData} />}
            {deleteData !== null && <Delete setDeleteData={setDeleteData} deleteData={deleteData} setDestroyData={setDestroyData} />}
            <Messages messages={messages} />
        </>
    );
}