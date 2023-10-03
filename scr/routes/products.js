import { Router } from "express";
import ProductManager from "../../Managers/ProductManager.js";
import productController from "../controllers/product.controller.js";


const router = Router()

router.get('/', productController.showProducts)

router.get('/:pid', productController.getProductByID)




export default router