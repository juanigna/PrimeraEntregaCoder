import express, { application } from "express";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import realTimeRoutes from "./routes/realTime.routes.js";
import userRoutes from "./routes/user.routes.js";
import viewTemplateRoutes from "./routes/viewTemplates.routes.js";
import authRoutes from "./routes/auth.routes.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import compression from "express-compression";
import dotenv from "dotenv"
import { handlerError } from "./middlewares/errors/handler.error.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";
dotenv.config();

// Setting app

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion API!',
            description: 'Documentacion de la API del proyecto de eccomerce de CoderHouse ',
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}


const specs = swaggerJSDoc(swaggerOptions)
const app = express();


// Setting port

app.set("port", process.env.PORT || 8080);

// Middlewares
app.use(cookieParser("somethinHere"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(compression({
    brotli:{
        enabled:true, zlib: {}
    }
}))
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//Initialize passport
initializePassport();
app.use(passport.initialize());
// Using the routes
app.use("/", viewTemplateRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/realtimeproducts", realTimeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(handlerError)
export default app;
  