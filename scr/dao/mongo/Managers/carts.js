import { noStock } from "../../../constants/productError.js";
import EErors from "../../../constants/EErrors.js";
import mongoose from "mongoose";
import cartModel from "../models/cart.js";
import ProductsManager from "./products.js";

const productsService = new ProductsManager();

//lsof -i tcp:8080               
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
        return cartModel.findByIdAndUpdate(cid, { products: [] })
    }

    addProductsToCart = async (cid, pid, quantity) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();

        if (cart) {
            const prodInCart = cart.products
            //console.log("carrito", prodInCart)
            const proadded = prodInCart.find(({ product }) => product._id == pid)
            if (proadded.stock < 0) {
                ErrorsService.createError({
                    name: "Error al agregar producto al carrito",
                    cause: noStock(proadded),
                    code: EErors.NO_STOCK,
                    status: 400
                })
            }
            //console.log(proadded.quantity)
            if (proadded) {
                //console.log("el p esta en el carrito")
                const newQ = Number(proadded.quantity) + Number(quantity)
                proadded.quantity = newQ

                return cartModel.updateOne({ _id: cid }, cart)
            } else {
                //console.log("no esta en el carrito")
                return cartModel.updateOne({ _id: cid }, { $push: { products: { product: new mongoose.Types.ObjectId(pid), quantity: quantity } } })
            }

        }
    }
    updateQuantity = async (cid, pid, quantity) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();
        const prodInCart = cart.products
        const prod = prodInCart.find(({ product }) => product._id == pid)
        //console.log(prod)
        try {
            // console.log(quantity)
            prod.quantity = quantity
        } catch (error) {
            console.log(error)
        }
        return cartModel.updateOne({ _id: cid }, cart)

    }

    deleteProduct = async (cid, pid) => {
        const cart = await cartModel.findOne({ _id: cid }).lean();
        const prodInCart = cart.products
        const p = prodInCart.find(({ product }) => product._id == pid)
        if (p) {
            const newP = prodInCart.splice(prodInCart.findIndex(({ product }) => product._id == pid))
            cart.products = newP
            return await cartModel.updateOne({ _id: cid }, cart)
        } else {
            console.log("no existe el producto en el carrito")
        }
    }
}


