import * as A from '../Constants/actions';

export default function usersReducer(state, action) {

    console.log('Users reducer change state');

    let newState;

    switch (action.type) {

        case A.LOAD_ACTIVE_USERS_FROM_SERVER:
            newState = action.payload;
            break;


        default: newState = state;
    }


    return newState;
}