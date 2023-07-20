import { Router } from "express";
import ProductService from "../services/repositories/product.service.js";
import productController from "../controllers/product.controller.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router();

router.get('/', productController.getProducts)
// router.get('/', async (req, res) => {
//     const produ = await ProductService.getProducts();
//     res.send({ status: 201, payload: produ })
// })

router.post('/', authRoles('admin'), productController.createProduct)
// router.post('/', async (req, res) => {
//     const { title, description, price, thumbnail, code, stock } = req.body;
//     if (!title || !description || !price || !thumbnail || !code || !stock) return res.status(400).send({ status: "error", error: "incomplete values" });
//     const p = {
//         title,
//         description,
//         price,
//         thumbnail,
//         code,
//         stock
//     };

//     const result = await productService.createProduct(p);
//     res.sendStatus(201)
// })

router.get('/:pid', productController.getProductByID)
// router.get('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     const product = await productService.getProductsBy({ _id: pid });
//     if (!product) res.status(404).send({ status: "error", error: "product not found" })
//     return res.send({ status: 'success', payload: product })
// })

router.put('/:pid', productController.updateProduct)
// router.put('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     const updateproduct = req.body;
//     const result = await productService.updateProduct(pid, updateproduct);
//     res.sendStatus(201)
// })

router.delete('/:pid', authRoles('admin'), productController.deleteProduct)
// 

export default router