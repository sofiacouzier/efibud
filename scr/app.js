import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import ProductManager from "../Managers/ProductManager.js";
import productRouter from "./routes/products.js";
import cartrouter from "./routes/cart.js";
import viewsRouter from "./routes/views.router.js"



const productmanager = new ProductManager

const app = express()
const server = app.listen(8080, () => console.log("Listening on 8080"))
const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set("view engine", 'handlebars')
app.use((req, res, next) => {
    req.io = io;
    next()
})
app.use('/api/products', productRouter)
app.use('/api/cart', cartrouter)


app.use('/', viewsRouter);


io.on('connection', async socket => {
    console.log("Nuevo cliente conectado");
    const p = await productmanager.getProducts()

    io.emit("entregando productos", p)
})