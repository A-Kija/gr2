export default function Messages({ messages }) {


    if (0 === messages.length) {
        return null;
    }


    return (

        <div className="msg-container">
            {
                messages.map(msg => (
                    <div class={`alert alert-${msg.type} alert-dismissible`}>
                        <strong>{msg.title}</strong> {msg.text}
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                ))
            }

        </div>

    );

}