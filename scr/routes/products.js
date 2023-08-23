import { Router } from "express";
import ProductManager from "../../Managers/ProductManager.js";
import productController from "../controllers/product.controller.js";

const productmanager = new ProductManager

const router = Router()

router.get('/', productController.showProducts)

router.get('/:pid', productController.getProductByID)

router.post("/", productController.addProducts)

router.put("/:pid", productController.updateProduct)

router.delete("/:pid", productController.deleteProduct)


export default router