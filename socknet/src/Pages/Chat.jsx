import { createContext, useEffect, useState } from 'react';
import ChatList from '../Components/Users/ChatList';
import ChatMessages from '../Components/Users/ChatMessages';
import useChat from '../Hooks/useChat';


export const ChatData = createContext();

export default function Chat() {

    const { chat, dispatchChat, getChatMessages, postChatMessage } = useChat();

    const [showChat, setShowChat] = useState(null); // su kuo sneka ID

    useEffect(_ => {
        if (null === showChat) {
            return;
        }
        getChatMessages(showChat.id);

    }, [showChat]);

    return (
        <ChatData.Provider value={{
            chat, dispatchChat, showChat, setShowChat, postChatMessage
        }}>
            <section className="main">
                <ChatList />
                <ChatMessages />

            </section>
        </ChatData.Provider>
    );
}