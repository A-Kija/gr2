import { useContext } from 'react';
import Data from '../Contexts/Data';

export default function UsersList() {

    const { users } = useContext(Data);



    if (null === users) {
        return (
            <div className="bin bin-30">
                <h1>Siunčiami vartotojai...</h1>
            </div>
        );
    }


    return (
        <div className="bin bin-30">
            <h1>vartokliai</h1>
        </div>
    );
}