import express from "express";
import session from 'express-session';
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import ProductSRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js";
import ProductManager from "./dao/fileSystem/Managers/ProductManager.js"
import viewsRouter from "./routes/views.router.js";
import registerChatHandler from "./listeners/chatHandler.js";
import SessionRouter from "./routes/session.router.js";
import passport from 'passport';
import initializePassportStrategies from "./config/passport.config.js";
import config from "./config/config.js";
import mockingRouter from './routes/mocking.router.js'
import errorHandler from './middlewares/error.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";




const productmanager = new ProductManager

const app = express()
const PORT = config.app.PORT
const server = app.listen(PORT, () => console.log("Listening on 8080"))

const connection = mongoose.connect(config.mongo.URL)
const io = new Server(server)

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'ecommerce',
            description: 'documentacion para API del ecommerce'
        }
    },
    apis: [`${__dirname}/../docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
//app.use(attachLogger)
const sessionsRouter = new SessionRouter();
const cartRouter = new CartRouter();



app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set("view engine", 'handlebars')
app.use((req, res, next) => {
    req.io = io;
    next()
})

app.use(session({
    // store: new fileStorage({path:`${__dirname}/sessions`, ttl: 15, retries:0 }),//time to live
    store: new MongoStore({
        mongoUrl: "mongodb+srv://sofiacouzier:123@cluster0.crz5vth.mongodb.net/?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret: "CoderS3cretFelis",
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
initializePassportStrategies();

app.use('/api/products', ProductSRouter)
app.use('/api/cart', cartRouter.getRouter())

//app.use('/api/products', productRouter)
//app.use('/api/cart', cartrouter)

app.use('/api/prodycts', mockingRouter)
app.use('/', viewsRouter);

//app.use('/api/sessions', router);
app.use('/api/sessions', sessionsRouter.getRouter());



io.on('connection', async socket => {
    registerChatHandler(io, socket);
    console.log("Nuevo cliente conectado");
    const p = await productmanager.getProducts()
    io.emit("entregando productos", p)//envio los productos para que sigan apareciendo aunque no haya agregado ni eliminado productos
})

app.use(errorHandler)