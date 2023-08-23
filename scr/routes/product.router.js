import { Router } from "express";
import ProductService from "../services/repositories/product.service.js";
import productController from "../controllers/product.controller.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router();

router.get('/', productController.getProducts)


router.post('/', authRoles('admin'), productController.createProduct)

router.get('/:pid', productController.getProductByID)

router.put('/:pid', authRoles('admin'), productController.updateProduct)

router.delete('/:pid', authRoles('admin'), productController.deleteProduct)


export default router