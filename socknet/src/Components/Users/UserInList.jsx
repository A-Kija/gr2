export default function UserInList({user}) {

    return (
        <li className="users-list__user">
            <div className="users-list__user__name">{user.name}</div>
            <div className="users-list__user__avatar">
                <img src={user.avatar} alt={user.name} />
            </div>
        </li>
    );
}