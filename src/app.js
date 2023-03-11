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
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

// Setting appb

const app = express();

// Setting port

app.set("port", 8080);

// Middlewares

app.use(cookieParser("somethinHere"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://juani:juan44200@cluster0.zf75rie.mongodb.net/session?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "tosecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
// Using the routes
app.use("/", viewTemplateRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/realtimeproducts", realTimeRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

export default app;
