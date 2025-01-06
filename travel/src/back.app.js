
if (document.querySelector('[data-msg]')) {
    const msg = document.querySelector('[data-msg]');
    setTimeout(_ => {
        msg.remove();
    }, 3000);
}