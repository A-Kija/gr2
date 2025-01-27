import { v4 as uuidv4 } from 'uuid';

class Messages {

    static msgs = [];

    static addMessage(response) {
        if (!response.data?.msg) {
            return;
        }
        const msg = {
            id: uuidv4(),
            text: response.data.msg.text,
            type: response.data.msg.type
        }
        this.msgs.push(msg);

        setTimeout(_ => {
            this.removeMessage(msg.id);
        }, 5000);
    }

    static removeMessage(id) {
        this.msgs = this.msgs.filter(msg => msg.id !== id);
    }

}