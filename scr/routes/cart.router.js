import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import { passportCall } from "../services/auth.js";
import { privacy } from "../middlewares/auth.js";
import BaseRouter from "./Router.js";

export default class CartRouter extends BaseRouter {
    init() {
        this.post('/', ["PRIVATE"], cartController.createCart)
        this.get('/', ["PRIVATE"], cartController.getCart);
        this.post('/:cid/product/:pid', ["PRIVATE"], passportCall("jwt", { strategyType: "jwt" }), cartController.addProdBack)
        this.post('/agregar', ["PRIVATE"], passportCall("jwt", { strategyType: "jwt" }), privacy('PRIVATE'), cartController.addProd)
        this.get('/:cid', ["PRIVATE"], cartController.getCartByID)
        this.delete('/:cid', ["PRIVATE"], cartController.deleteCart)
        this.delete('/:cid/products/:pid', ["PRIVATE"], cartController.deleteProd)
        this.put('/:cid/products/:pid', ["PRIVATE"], cartController.updateQ)
        this.post("/:cid/purchase", ["PRIVATE"], passportCall("jwt", { strategyType: "jwt" }), cartController.createTicket)

    }
}

