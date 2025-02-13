export default function no1000(action) {

    if (action.payload > 10) {
        action.payload = 10;
    }

    return action;

}