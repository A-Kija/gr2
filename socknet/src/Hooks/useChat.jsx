import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import chatReducer from '../Reducers/chatReducer';

export default function useChat() {

    /*
    chat: 
    {
        chatList: [
            {id, name, avatar},
            {id, name, avatar},
            {id, name, avatar}
        ],
        messages: [
            {id}
        ]
    }

*/


    const [chat, dispatchChat] = useReducer(chatReducer, null);


    useEffect(_ => {

        axios.get(C.SERVER_URL + 'chat/list', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                dispatchChat({
                    type: A.LOAD_CHAT_USERS,
                    payload: res.data.users
                });
            })
            .catch(error => {
                console.log(error)
            })

    }, []);


    return { chat, dispatchChat }
}