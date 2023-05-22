import { Router } from "express";
//import ProductManager from "../dao/fileSystem/Managers/ProductManager.js";
import ProductsManager from "../dao/mongo/Managers/products.js";

//const pm = new ProductManager

const router = Router();
const productsService = new ProductsManager();

router.get('/', async (req, res) => {
    const p = await productsService.getProducts();
    console.log(p)
    res.render('home', {
        p,
        css: 'home'
    });
})

router.get('/chat', async (req, res) => {
    res.render('chat')
})

router.get('/carts', async (req, res) => {
    res.render('carts')
})





router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        css: "realtimeproducts"
    });
})





export default router;