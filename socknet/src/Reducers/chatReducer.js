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


        default: newState = state;
    }

    return newState;
}