import { useContext } from 'react';
import { ChatData } from '../../Pages/Chat';
import Auth from '../../Contexts/Auth';

export default function ChatMessages() {

    const { showChat, chat } = useContext(ChatData);
    const { user } = useContext(Auth);

    let chatData;
    if (chat?.messages?.some(m => m.id === showChat.id)) {
        chatData = chat.messages.find(m => m.id === showChat.id).m;
    } else {
        chatData = null;
    }



    return (
        <div className="bin bin-70">
            <h2>Messages</h2>
            <ul className="chat-messages">
                {
                    chatData
                        ?
                        chatData.map(msg =>
                            <li key={msg.id} className={`chat-messages__msg ${msg.type}`}>
                                <div className="chat-messages__msg__name">
                                    {msg.type === 'read' ? showChat.name : user.name}
                                </div>
                                {msg.text}
                            </li>)
                        :
                        <li>Loading...</li>
                }
            </ul>
        </div>



    );

}