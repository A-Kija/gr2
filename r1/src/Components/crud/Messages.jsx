export default function Messages({ messages, removeMessage }) {


    if (0 === messages.length) {
        return null;
    }


    return (

        <div className="msg-container">
            {
                messages.map(msg => (
                    <div key={msg.id} className={`alert alert-${msg.type} alert-dismissible`}>
                        <strong>{msg.title}</strong> {msg.text}
                        <button type="button" onClick={_ => removeMessage(msg.id)} className="btn-close" aria-label="Close"></button>
                    </div>
                ))
            }

        </div>

    );

}