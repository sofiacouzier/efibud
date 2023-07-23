import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import ticketController from "../controllers/ticket.controller.js";
import { passportCall } from "../services/auth.js";
import { cartService } from "../services/index.js";
import { privacy } from "../middlewares/auth.js";
import ProductService from "../services/repositories/product.service.js";
import ProductsManager from "../dao/mongo/Managers/products.js";
import productModel from "../dao/mongo/models/product.js";
import TicketsManager from "../dao/mongo/Managers/ticket.js";
import shortid from 'shortid';
import ticketModel from "../dao/mongo/models/ticket.js";


const router = Router();


//CAPAS


router.post('/', cartController.createCart)


router.get('/', cartController.getCart);

//router.post('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), cartController.addProdBack)

router.post('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), cartController.addProdBack)

router.post('/agregar', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.addProd)

// router.post('/agregar', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), async (req, res) => {
//     const pid = req.body.prodId
//     const cid = req.user.user.cid
//     const quantity = 1
//     try {
//         const result = await cartService.addProductsToCart(cid, pid, quantity);
//         res.sendStatus(200)
//     } catch (error) {
//         console.log(error)
//     }

// })

router.get('/:cid', cartController.getCartByID)
// router.get('/:cid', async (req, res) => {
//     const { cid } = req.params;
//     const cart = await cartService.getCartByID({ _id: cid });
//     if (!cart) res.status(404).send({ status: "error", error: "cart not found" })
//     return res.send({ status: 'success', payload: cart })
// })

router.delete('/:cid', cartController.deleteCart)

// router.delete('/:cid', async (req, res) => {
//     const { cid } = req.params
//     const cart = await cartService.deleteCart({ _id: cid });
//     return res.send({ status: 'success' })
// // })

router.delete('/:cid/products/:pid', cartController.deleteProd)

// router.delete('/:cid/products/:pid', async (req, res) => {
//     const { cid } = req.params
//     const { pid } = req.params
//     const cart = await cartService.deleteProduct(cid, pid);
//     return res.send({ status: 'success' })
// })

router.put('/:cid/products/:pid', cartController.updateQ)

// router.put('/:cid/products/:pid', async (req, res) => {
//     const { cid } = req.params
//     const { pid } = req.params
//     const { quantity } = req.body;
//     const cart = await cartService.updateQuantity(cid, pid, quantity);
//     return res.send({ status: 'success' })
// })


// agregar front: router.get("/ticket")

router.post("/:cid/purchase", passportCall("jwt", { strategyType: "jwt" }), cartController.createTicket)
// router.post("/:cid/purchase", passportCall("jwt", { strategyType: "jwt" }), async (req, res) => {

//     try {
//         const user = req.user
//         const { cid } = req.params
//         const cart = await cartService.getCartByID({ _id: cid }).lean().populate('products.product');
//         console.log(cart)
//         const prod = cart.products
//         const ticketProd = []
//         let prodLeft = []
//         let acumulador = 0
//         // console.log(prod)
//         async function update(pid, updatedProduct) {
//             const result = await productModel.findByIdAndUpdate(pid, { $set: updatedProduct })
//         }
//         prod.forEach(p => {
//             if (p.quantity <= p.product.stock) {
//                 let pid = p.product._id
//                 let newStock = p.product.stock - p.quantity
//                 let updatedProduct = { stock: newStock }
//                 //console.log(pid, newStock)
//                 try {
//                     update(pid, updatedProduct)

//                 } catch (error) {
//                     console.log(error)
//                 }
//                 //si la cantidad es menor o coincide con el stock, agregar el producto al ticket
//                 ticketProd.push(p)
//                 const price = p.quantity * p.product.price
//                 acumulador = acumulador + price
//             } else {
//                 prodLeft.push(p)
//                 console.log(`el producto ${p.product.title} no tiene suficiente stock`)
//             }
//         })
//         //console.log(acumulador)
//         //console.log(ticketProd)
//         // Generar el código único
//         const code = shortid.generate();
//         const ticket = {
//             user: user.user._id,
//             code: code,
//             amount: acumulador,
//             purchaser: user.user.name,
//             products: ticketProd
//         }

//         ticketModel.create(ticket)

//         return res.send(prodLeft, { status: 'success' })
//     } catch (error) {
//         console.log(error)
//         return res.send({ status: 'error' })
//     }
// })

export default router