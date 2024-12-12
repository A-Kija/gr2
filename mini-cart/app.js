const API_URL = 'https://in3.dev/knygos/';
const booksHtml = document.querySelector('[data-books]');
const bookTemplate = document.querySelector('template[data-book]');
const cartItemTemplate = document.querySelector('template[data-cart-item]');
const cartHtml = document.querySelector('[data-cart]');
const cartCountHtml = document.querySelector('[data-cart-count]');
let books;
let cart;


const init = _ => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
    cartCount();
}

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
        syncCartPrices();
    });

const syncCartPrices = _ => {
    cart = cart.map(book => {
        const foundBook = books.find(b => b.id == book.id);
        return { ...book, price: foundBook.price };
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const cartCount = _ => {
    const count = cart.reduce((count, book) => count + book.count, 0);
    cartCountHtml.textContent = count;
}



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
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    cartCount();
}

const removeButtonsEvents = _ => {
    const buttons = cartHtml.querySelectorAll('[data-remove]');
    buttons.forEach(button => {
        button.addEventListener('click', _ => {
            const id = parseInt(button.dataset.id);
            removeFromCart(id);
        });
    });
}

const removeFromCart = id => {
    cart = cart.filter(book => book.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    cartCount();
}


const renderCart = _ => {
    cartHtml.innerHTML = '';
    cart.forEach(cartBook => {
        const cartElement = cartItemTemplate.content.cloneNode(true);
        cartElement.querySelector('[data-title]').textContent = cartBook.title;
        cartElement.querySelector('[data-price]').textContent = cartBook.price.toFixed(2);
        cartElement.querySelector('[data-count]').textContent = cartBook.count;
        cartElement.querySelector('[data-item-total]').textContent = (cartBook.price * cartBook.count).toFixed(2);
        cartElement.querySelector('[data-image]').src = cartBook.img;
        cartElement.querySelector('[data-remove]').dataset.id = cartBook.id;
        cartHtml.appendChild(cartElement);
    });
    const total = cart.reduce((total, book) => total + book.price * book.count, 0);
    const totalElement = document.createElement('li');
    totalElement.classList.add('cart-total', 'list-group-item');
    if (cart.length === 0) {
        totalElement.textContent = 'Krepšelis tuščias';
    } else {
        totalElement.innerHTML = `<strong>Viso:</strong> <span>${total.toFixed(2)} EUR</span>`;
    }
    cartHtml.appendChild(totalElement);
    removeButtonsEvents();
}

init();