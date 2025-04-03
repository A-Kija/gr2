import { createContext } from 'react';
import ChatList from '../Components/Users/ChatList';
import ChatMessages from '../Components/Users/ChatMessages';
import useChat from '../Hooks/useChat';


export const ChatData = createContext();

export default function Chat() {

    const { chat, dispatchChat } = useChat();

    return (
        <ChatData.Provider value={{
            chat, dispatchChat
        }}>
            <section className="main">
                <ChatList />
                <ChatMessages />

            </section>
        </ChatData.Provider>
    );
}