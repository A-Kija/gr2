export default function UserInList({user}) {

    return (
        <li className="users-list__user">
            <div className="users-list__user__role">[{user.userRole}]</div>
            <div className="users-list__user__name" style={{
                color: user.online ? 'darkgreen' : 'gray'
            }}>{user.name}</div>
            <div className="users-list__user__avatar">
                <img src={user.avatar} alt={user.name} />
            </div>
        </li>
    );
}