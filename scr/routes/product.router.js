import { Router } from "express";
import { productService } from "../dao/mongo/Managers/index.js";
//import ProductsManager from "../dao/mongo/Managers/products.js";

const router = Router();

router.get('/', async (req, res) => {
    const produ = await productService.getProducts();
    res.send({ status: 201, payload: produ })
})

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) return res.status(400).send({ status: "error", error: "incomplete values" });
    const p = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    const result = await productService.createProduct(p);
    res.sendStatus(201)
})


router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await productService.getProductsBy({ _id: pid });
    if (!product) res.status(404).send({ status: "error", error: "product not found" })
    return res.send({ status: 'success', payload: product })
})


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updateproduct = req.body;
    const result = await productService.updateProduct(pid, updateproduct);
    res.sendStatus(201)
})


router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productService.deleteProduct(pid);
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }

})

export default router