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
    return res.send({ status: 'success', payload: product })
})



// router.delete('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     try {
//         await productsService.deleteProduct(pid);
//         res.sendStatus(201)
//     } catch (error) {
//         console.log(error)
//     }

// })

export default router