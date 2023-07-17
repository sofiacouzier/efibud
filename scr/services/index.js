import UsersManager from "../dao/mongo/Managers/users.js";
import CartsManager from "../dao/mongo/Managers/carts.js";
import ProductsManager from "../dao/mongo/Managers/products.js";
import MessageManager from "../dao/mongo/Managers/message.js";
import UserService from "./repositories/user.service.js";
import CartService from "./repositories/cart.service.js";
import ProductService from "./repositories/product.service.js";
import PersistenceFactory from "../dao/Factory.js";

const userDao = await PersistenceFactory.getPersistence()

export const userService = new UserService(userDao)

export const productService = new ProductService(new ProductsManager())

export const cartService = new CartService(new CartsManager());

export const messageService = new MessageManager()