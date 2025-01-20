// webpack.mix.js

const mix = require('laravel-mix');

mix
.js('src/app.js', 'public')
.sass('src/style.scss', 'public');