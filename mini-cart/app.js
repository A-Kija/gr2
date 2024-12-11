const API_URL ='https://in3.dev/knygos/';
const booksHtml = document.querySelector('[data-books]');
const bookTemplate = document.querySelector('template[data-book]');
let books;


fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        booksHtml.innerHTML = ''; // ismetam spinerius
        books = data;
        data.forEach(book => {
            const bookElement = bookTemplate.content.cloneNode(true);
            bookElement.querySelector('[data-title]').textContent = book.title;
            bookElement.querySelector('[data-author]').textContent = book.author;
            bookElement.querySelector('[data-price]').textContent = book.price;
            bookElement.querySelector('[data-image]').src = book.img;
            booksHtml.appendChild(bookElement);
        });
    });
