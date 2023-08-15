import { Router } from "express";
import ProductManager from "../../Managers/ProductManager.js";
import productController from "../controllers/product.controller.js";

const productmanager = new ProductManager

const router = Router()

router.get('/', productController.showProducts)
// router.get('/', async (req, res) => {
//     try {
//         const { page = 1 } = req.query;
//         const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productService.paginate({}, { page, limit: 10, lean: true });

//         const produ = docs

//         res.render('home', {
//             produ,
//             page: rest.page
//         })

//         // const products = await productmanager.getProducts()
//         // let query = req.query // encontrar el query
//         // let limit = Number(Object.values(query))// conseguir que numero es el limit

//         // if (!limit) {
//         //     res.send(products)
//         // } else if (limit < products.length) {
//         //     const limitedProd = products.slice(0, limit)// slice: (de donde empieza hasta el ultimo incluido)
//         //     return res.status(200).send(limitedProd)
//         // }
//     } catch (error) {
//         console.log(error)
//     }

// })

router.get('/:pid', productController.getProductByID)
// router.get('/:pid', async (req, res) => {
//     let id = Number(Object.values(req.params))
//     const prod = await productmanager.getProductByID(id)
//     res.send(prod)
// })

router.post("/", productController.addProducts)
// router.post("/", async (req, res) => {
//     try {
//         const product = req.body
//         const result = await productService.addProducts(product)
//         const everyProd = await productService.getProducts()
//         if (result.status === 'error') return res.status(400).send({ result }); else {
//             req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware
//             return res.status(200).send({ result });
//         }

//     } catch (error) {
//         console.log(error)
//     }
//})

router.put("/:pid", productController.updateProduct)
// router.put("/:pid", async (req, res) => {
//     try {
//         const updateProduct = req.body
//         const id = Number(Object.values(req.params))
//         const result = await productService.updateProduct(id, updateProduct)

//         if (result.status === 'error') return res.status(400).send({ result });

//         return res.status(200).send({ result });
//     } catch (error) {
//         console.log(error)
//     }
// })

router.delete("/:pid", productController.deleteProduct)
// router.delete("/:pid", async (req, res) => {
//     try {
//         const id = Number(Object.values(req.params))
//         const result = await productService.deleteProduct(id)
//         const everyProd = await productService.getProducts()

//         if (result.status === 'error') return res.status(400).send({ result });
//         req.io.emit("entregando productos", everyProd)//envio los nuevos productos con el servidor que me paso desde el middleware

//         return res.status(200).send({ message: "producto eliminado" });

//     } catch (error) {
//         console.log(error)
//     }
// })


export default router