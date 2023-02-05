import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import realTimeRoutes from "./routes/realTime.routes.js"
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
// Setting app

const app = express();

// Setting port

app.set('port', 8080);


// Middlewares

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname +'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:true}))

// Using the routes
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/realtimeproducts', realTimeRoutes);

export default app;