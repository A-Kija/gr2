const API_URL ='https://in3.dev/knygos/';
const booksHtml = document.querySelector('[data-books]');
const bookTemplate = document.querySelector('template[data-book]');
const cartItemTemplate = document.querySelector('template[data-cart-item]');
let books;
const cart = [];


fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        booksHtml.innerHTML = ''; // ismetam spinerius
        books = data;
        console.log(data);
        data.forEach(book => {
            const bookElement = bookTemplate.content.cloneNode(true);
            bookElement.querySelector('[data-title]').textContent = book.title;
            bookElement.querySelector('[data-author]').textContent = book.author;
            bookElement.querySelector('[data-price]').textContent = book.price;
            bookElement.querySelector('[data-image]').src = book.img;
            bookElement.querySelector('[data-add-button]').dataset.id = book.id;
            booksHtml.appendChild(bookElement);
        });
        addButtonsEvents();
    });



const addButtonsEvents = _ => {
    const buttons = document.querySelectorAll('[data-add-button]');
    buttons.forEach(button => {
        button.addEventListener('click', _ => {
            const id = button.dataset.id;
            const book = books.find(book => book.id == id);
            const input = button.closest('[data-actions]').querySelector('input');
            const count = parseInt(input.value);
            input.value = 1;
            addToCart(book, count);
        });
    });
}

const addToCart = (book, count) => {
    const cartBook = cart.find(cartBook => cartBook.id == book.id);
    if (cartBook) {
        cartBook.count += count;
    } else {
        cart.push({ ...book, count });
    }
    renderCart();

    console.log(cart);
}


const renderCart = _ => {
    const cartHtml = document.querySelector('[data-cart]');
    cartHtml.innerHTML = '';
    cart.forEach(cartBook => {
        const cartElement = cartItemTemplate.content.cloneNode(true);
        cartElement.querySelector('[data-title]').textContent = cartBook.title;
        cartElement.querySelector('[data-price]').textContent = cartBook.price.toFixed(2);
        cartElement.querySelector('[data-count]').textContent = cartBook.count;
        cartElement.querySelector('[data-item-total]').textContent = (cartBook.price * cartBook.count).toFixed(2);
        cartElement.querySelector('[data-image]').src = cartBook.img;
        cartHtml.appendChild(cartElement);
    });
    const total = cart.reduce((total, book) => total + book.price * book.count, 0);
    const totalElement = document.createElement('li');
    totalElement.classList.add('list-group-item', 'd-flex', 'justify-content-between');
    totalElement.innerHTML = `<strong>Total:</strong> <span>${total.toFixed(2)} EUR</span>`;
    cartHtml.appendChild(totalElement);
}