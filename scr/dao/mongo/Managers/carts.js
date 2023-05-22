import cartModel from "../models/cart.js";
import productModel from "../models/product.js";

export default class CartsManager {
    getCart = () => {
        return cartModel.find().lean();
    }
    getCartByID = (id) => {
        return cartModel.findOne(id).lean()
    }
    createCart = (cart) => {
        return cartModel.create(cart)
    }
    addProductsToCart = (cid, pid) => {
        const productAdd = productModel.findById(pid)
        console.log(productAdd)
        try {
            return cartModel.updateOne({ id: cid }, { products: productAdd })

        } catch (error) {
            console.log("errorr")
        }
    }

}