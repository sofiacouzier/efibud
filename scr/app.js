import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import ProductSRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js";
import ProductManager from "./dao/fileSystem/Managers/ProductManager.js"
//import productRouter from "./routes/products.js";
//import cartrouter from "./routes/cart.js";
import viewsRouter from "./routes/views.router.js";
import registerChatHandler from "./listeners/chatHandler.js";



const productmanager = new ProductManager

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log("Listening on 8080"))
const connection = mongoose.connect("mongodb+srv://sofiacouzier:123@cluster0.crz5vth.mongodb.net/?retryWrites=true&w=majority")
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

app.use('/api/products', ProductSRouter)
app.use('/api/cart', CartRouter)

//app.use('/api/products', productRouter)
//app.use('/api/cart', cartrouter)


app.use('/', viewsRouter);


io.on('connection', async socket => {
    registerChatHandler(io, socket);
    console.log("Nuevo cliente conectado");
    const p = await productmanager.getProducts()
    console.log(p)
    io.emit("entregando productos", p)//envio los productos para que sigan apareciendo aunque no haya agregado ni eliminado productos
})