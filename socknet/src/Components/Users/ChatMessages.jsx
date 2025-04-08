import { useContext, useState } from 'react';
import { ChatData } from '../../Pages/Chat';
import Auth from '../../Contexts/Auth';

export default function ChatMessages() {

    const { showChat, chat, postChatMessage } = useContext(ChatData);
    const { user } = useContext(Auth);

    const [newMesage, setNewMessage] = useState('');

    let chatData;
    if (chat?.messages?.some(m => m.id === showChat.id)) {
        chatData = chat.messages.find(m => m.id === showChat.id).m;
    } else {
        chatData = null;
    }

    const sendMessage = _ => {
        postChatMessage({
            userID: showChat.id,
            message: newMesage
        });
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
                                    <span className="name">{msg.type === 'read' ? showChat.name : user.name}</span>
                                    <span className="time">{msg.time}</span>
                                </div>
                                {msg.text}
                            </li>)
                        :
                        <li>Loading...</li>
                }
            </ul>
            <div className="write-chat-message">
                <textarea value={newMesage} onChange={e => setNewMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>



    );

}