import { noStock } from "../../../constants/productError.js";
import EErors from "../../../constants/EErrors.js";
import mongoose from "mongoose";
import cartModel from "../models/cart.js";
import ProductsManager from "./products.js";
import ProductService from "../../../services/repositories/product.service.js";
import { productService } from "../../../services/index.js";
export default class CartsManager {
    getCart = () => {
        return cartModel.find().lean();
    }
    getCartByID = (cid) => {
        return cartModel.findOne({ _id: cid }).lean()
    }
    createCart = (cart) => {
        return cartModel.create(cart)
    }
    deleteCart = (cid) => {
        return cartModel.findByIdAndDelete(cid)
    }

    addProductsToCart = async (cid, pid, quantity) => {

        try {
            const cart = await cartModel.findOne({ _id: cid })
            const prodInCart = cart.products

            const proadded = prodInCart.find(({ product }) => product._id == pid)

            const product = await productService.getProductsBy(pid)

            if (proadded) {
                if (proadded.quantity >= product.stock) {
                    return console.log("no hay suficiente stock")
                }
                const newQ = Number(proadded.quantity) + Number(quantity)
                proadded.quantity = newQ

                return cartModel.updateOne({ _id: cid }, cart)
            }

            if (quantity >= product.stock) {
                return console.log("no hay suficiente stock")
            }
            await cartModel.updateOne(
                { _id: cid }, { $push: { products: { product: new mongoose.Types.ObjectId(pid), quantity: quantity } } })
            return await cartModel.findOne({ _id: cid })


        }

        catch (err) {

            return err

        }
    }



    updateQuantity = async (cid, pid, quantity) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();
        const prodInCart = cart.products
        const prod = prodInCart.find(({ product }) => product._id == pid)
        try {
            prod.quantity = quantity
        } catch (error) {
            console.log(error)
        }
        return cartModel.updateOne({ _id: cid }, cart)

    }

    deleteProduct = async (cid, pid) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();
        const prodInCart = cart.products
        const id = pid.toString()

        const p = prodInCart.find(({ product }) => product.toString() == id)

        if (p) {
            const indexToRemove = prodInCart.findIndex(({ product }) => product.toString() === pid.toString());
            if (indexToRemove !== -1) {
                const newP = prodInCart.splice(indexToRemove, 1);
                cart.products = prodInCart;  // Asigna el array modificado a cart.products
                console.log(cart.products);
                return await cartModel.updateOne({ _id: cid }, cart);
            } else {
                console.log("No se encontró el producto en el carrito.");
                return cartModel.findOne({ _id: cid });  // Devuelve el carrito actualizado o original
            }
        } else {
            console.log("no existe el producto en el carrito")
        }
    }
}


