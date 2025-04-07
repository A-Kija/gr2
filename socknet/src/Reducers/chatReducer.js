import * as A from '../Constants/actions';

export default function chatReducer(state, action) {

    let newState;

    switch (action.type) {

        case A.LOAD_CHAT_USERS:
            {
                newState = structuredClone(state);
                newState || (newState = {});
                newState.chatList || (newState.chatList = []);
                newState.chatList.push(...action.payload);
                break;
            }
        case A.LOAD_CHAT_MESSAGES: {
            {
                newState = structuredClone(state);
                newState.messages || (newState.messages = []);
                const chatID = action.payload.chatWith;
                const messages = action.payload.messages.map(m => {
                    const type = chatID === m.fromID ? 'read' : 'write';
                    return { text: m.message, time: m.time, id: m.id, type };
                });

                const chat = newState.messages.find(m => m.id === chatID);
                if (chat) {
                    chat.m = messages;
                } else {
                    newState.messages.push({id: chatID, m: messages});
                }

                console.log('MESSAGES', newState);

                break;
            }
        }


        default: newState = state;
    }

    return newState;
}