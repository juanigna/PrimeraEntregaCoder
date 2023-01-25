const express = require('express');
const morgan = require('morgan');
const productsRoutes = require('./routes/products.routes.js');
const cartsRoutes = require('./routes/carts.routes.js');

// Setting app

const app = express();

// Setting port

app.set('port', 8080);


// Middlewares

app.use(express.static(__dirname + 'public/'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:true}))

// Using the routes
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)

module.exports = app;