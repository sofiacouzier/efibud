import cartController from "../controllers/cart.controller.js";
import { privacy } from "../middlewares/auth.js";
import { passportCall } from "../services/auth.js";
import BaseRouter from "./Router.js";

export default class cartrouter extends BaseRouter {
    init() {
        this.post("/", ["PRIVATE"], cartController.createCart)
        this.get("/:cid", ["PRIVATE"], cartController.getCartByID)
        this.post("/product/:pid", ["PRIVATE"], passportCall("jwt", { strategyType: "jwt" }), cartController.addProd)

    }
}