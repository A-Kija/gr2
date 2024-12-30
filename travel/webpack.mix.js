// webpack.mix.js

const mix = require('laravel-mix');

mix
.js('src/front.app.js', 'public')
.js('src/back.app.js', 'public')
.sass('src/front.style.scss', 'public')
.sass('src/back.style.scss', 'public');