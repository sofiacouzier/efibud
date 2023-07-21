import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import ticketController from "../controllers/ticket.controller.js";
import { passportCall } from "../services/auth.js";
import { cartService } from "../services/index.js";
import { privacy } from "../middlewares/auth.js";
const router = Router();


//CAPAS


router.post('/', cartController.createCart)


router.get('/', cartController.getCart);


router.post('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), async (req, res) => {
    console.log(req.user)
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartService.addProductsToCart(cid, pid, quantity);
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }

})

router.post('/aver', passportCall("jwt", { strategyType: "jwt" }), async (req, res) => {
    console.log("llego")
    try {
        console.log(req.body.prodId)
        console.log(req.user.user.cid);
        console.log("aver");
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error al analizar el JSON:', error.message);
        return res.status(500).json({ message: 'Error en el servidor' });
    }

})

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




// arreglar router.post('/:cid/purchase', ticketController.createTicket())

export default router