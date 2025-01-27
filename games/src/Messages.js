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
        }, 10000);

        this.renderMessages();
    }

    static removeMessage(id) {
        this.msgs = this.msgs.filter(msg => msg.id !== id);
        this.renderMessages();
    }

    static renderMessages() {
        const bin = document.querySelector('[data-msg-bin]');
        bin.innerHTML = '';
        this.msgs.forEach(msg => {
            const div = document.createElement('div');
            div.classList.add('alert', 'alert-dismissible', `alert-${msg.type}`);
            const span = document.createElement('span');
            span.innerText = msg.text;
            div.appendChild(span);
            const button = document.createElement('button');
            button.classList.add('btn-close');
            button.setAttribute('type', 'button');
            button.addEventListener('click', _ => {
                this.removeMessage(msg.id);
            });
            div.appendChild(button);
            bin.appendChild(div);
        });
    }

}

export default Messages;