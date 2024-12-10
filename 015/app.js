console.log('015/app.js');


// const nr1 = document.querySelector('#nr1');

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(duomenysIsServerio => {

//         console.log(typeof duomenysIsServerio);

//         duomenysIsServerio.sort((a, b) => a.title.length - b.title.length);

//         duomenysIsServerio.forEach(post => {
//             const div = document.createElement('div');
//             div.innerHTML = `
//             <h2>${post.title} ${post.title.length}</h2>
//             <p>${post.body}</p>
//             `;

//             nr1.appendChild(div);
//         });

//     });

// Aivaras

class Post {

    constructor(title, body, section) {
        this.title = title;
        this.body = body;
        this.section = section;
    }

    render() {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2>${this.title} ${this.title.length}</h2>
        <p>${this.body}</p>
        `;
        this.section.appendChild(div);
    }
}

// Gintare

const nr1 = document.querySelector('#nr1');

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(duomenysIsServerio => {

        console.log(duomenysIsServerio);

        duomenysIsServerio.forEach(post => {
            const naujasPost = new Post(post.title, post.body, nr1);
            naujasPost.render();
        });

    });





/// kazka su duomenysIsServerio