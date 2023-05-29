import { Router } from "express";
import ProductsManager from "../dao/mongo/Managers/products.js";
import CartsManager from "../dao/mongo/Managers/carts.js";

const router = Router();

const cartsService = new CartsManager();

router.post('/', async (req, res) => {
    const c = {
        products: []
    };
    const result = await cartsService.createCart(c);
    res.sendStatus(201)
})

router.get('/', async (req, res) => {
    const cart = await cartsService.getCart();
    res.send({ status: 'success', payload: cart })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartsService.addProductsToCart(cid, pid, quantity);
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }

})


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsService.getCartByID({ _id: cid });
    if (!cart) res.status(404).send({ status: "error", error: "cart not found" })
    return res.send({ status: 'success', payload: cart })
})

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartsService.deleteCart({ _id: cid });
    return res.send({ status: 'success' })

})

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const cart = await cartsService.deleteProduct(cid, pid);
    return res.send({ status: 'success' })

})

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    const { quantity } = req.body;
    const cart = await cartsService.updateQuantity(cid, pid, quantity);
    return res.send({ status: 'success' })
})

export default router