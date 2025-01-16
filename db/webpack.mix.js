// webpack.mix.js

const mix = require('laravel-mix');

mix
.js('src/app.js', 'public')
.js('src/app2.js', 'public')
.sass('src/style.scss', 'public');