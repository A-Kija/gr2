import { useContext } from 'react';
import Data from '../../Contexts/Data';
import UserInList from './UserInList';
// import '../../style/users.scss';

export default function UsersList() {

    const { users } = useContext(Data); // users yra steitas

    console.log('Users List <--- Data context', users?.length);

    if (null === users) {
        return (
            <div className="bin bin-30">
                <h1>Siunčiami vartotojai...</h1>
                {console.log('USER List rendered')}
            </div>
        );
    }


    return (
        <div className="bin bin-30">
            <h1>Sock-Net prisijungę nariai</h1>
            <ul className="users-list">
                {
                    users.map(u => u.userRole !== 'bot' ? <UserInList key={u.id} user={u} /> : null)
                }
                {
                    users.map(u => u.userRole === 'bot' ? <UserInList key={u.id} user={u} /> : null)
                }
            </ul>
            {console.log('USER List rendered')}
        </div>
        
    );
}