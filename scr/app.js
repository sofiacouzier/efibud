import express from "express";
import session from 'express-session';
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import { Server } from "socket.io";
import __dirname from "./utils.js";
import mongoose from "mongoose";

import viewsRouter from "./routes/views.router.js";
import SessionRouter from "./routes/session.router.js";
import UserRouter from "./routes/user.router.js";


import passport from 'passport';
import initializePassportStrategies from "./config/passport.config.js";
import config from "./config/config.js";
import errorHandler from './middlewares/error.js'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";




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
            description: 'Documentation API'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
//app.use(attachLogger)
const sessionsRouter = new SessionRouter();


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
        mongoUrl: "mongodb+srv://matkorussovich:matuefibud@cluster0.loumsmm.mongodb.net/?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret: "CoderS3cretFelis",
    resave: false,
    saveUninitialized: false
}))

app.set("/images", `${__dirname}/public/images`);

app.use(passport.initialize());
initializePassportStrategies();


app.use('/', viewsRouter);

//app.use('/api/sessions', router);
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/users', UserRouter)


app.use(errorHandler)