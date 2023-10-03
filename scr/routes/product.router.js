import { Router } from "express";
import productController from "../controllers/product.controller.js";
import { authRoles } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
const router = Router();

//FUNCIONA
router.get('/', productController.getProducts)

//FUNCIONA
router.post('/', passportCall("jwt", { strategyType: "jwt" }), authRoles('admin, premium'), productController.createProduct)

//FUNCIONA
router.get('/:pid', productController.getProductByID)

//FUNCIONA
router.put('/:pid', passportCall("jwt", { strategyType: "jwt" }), authRoles('admin, premium'), productController.updateProduct)

//FUNCIONA
router.delete('/:pid', passportCall("jwt", { strategyType: "jwt" }), authRoles('admin, premium'), authRoles('admin, premium'), productController.deleteProduct)


export default router