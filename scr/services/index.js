import UsersManager from "../dao/mongo/Managers/users.js";
import CartsManager from "../dao/mongo/Managers/carts.js";
import ProductsManager from "../dao/mongo/Managers/products.js";
import MessageManager from "../dao/mongo/Managers/message.js";
import UserService from "./user.service.js";

export const userService = new UserService(new UsersManager())
export const productService = new ProductsManager()
export const cartService = new CartsManager()
export const messageService = new MessageManager()