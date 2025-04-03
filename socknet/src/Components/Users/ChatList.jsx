import { useContext } from 'react';
import Data from '../../Contexts/Data';
import { ChatData } from '../../Pages/Chat';

export default function ChatList() {

    const { chat, dispatchChat } = useContext(ChatData);

    return (
        <div className="bin bin-30">
            <h2>Sock-Net Chat</h2>
            <ul className="chat-list">
                {
                    chat && chat.chatList.map(user =>
                        <li key={user.id} className="chat-list__user">
                            <div className="chat-list__user__avatar">
                                <img src={user.avatar} alt={user.name} />
                            </div>
                            <div className="chat-list__user__name">
                                {user.name}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>



    );

}