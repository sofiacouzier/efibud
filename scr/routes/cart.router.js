import cartController from "../controllers/cart.controller.js";
import { passportCall } from "../services/auth.js";
import { privacy } from "../middlewares/auth.js";
import { Router } from "express";


const router = Router();
//funciona
router.get('/', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.getCart)

//funciona
router.post('/', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.createCart)

//funciona
router.delete('/:cid', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.deleteCart)

//funciona
router.get('/:cid', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.getCartByID)

//funciona
router.get('/', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.showCart)

//funciona f
router.post('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.addProdBack)


//funciona
router.delete('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.deleteProd)

//funciona
router.put('/:cid/product/:pid', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.updateQ)

//funciona
router.post('/agregar', passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.addProd)


//funciona
router.post("/:cid/purchase", passportCall("jwt", { strategyType: "jwt" }), privacy("PRIVATE"), cartController.createTicket)

export default router