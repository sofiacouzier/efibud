import { Router } from "express";
import ProductManager from "../../Managers/ProductManager.js";


const pm = new ProductManager

const router = Router();


router.get('/', async (req, res) => {
    const p = await pm.getProducts()
    res.render('home', {
        value: p,
        css: "home"
    });
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        css: "realtimeproducts"
    });
})





export default router;