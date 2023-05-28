import mongodb, { ObjectId } from "mongodb";
import mongoose from "mongoose";
import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import ProductsManager from "./products.js";
import { Types } from "mongoose";

const productsService = new ProductsManager();

//lsof -i tcp:8080               
export default class CartsManager {
    getCart = () => {
        return cartModel.find().lean();
    }
    getCartByID = (cid) => {
        return cartModel.find({ _id: cid }).lean()
    }
    createCart = (cart) => {
        return cartModel.create(cart)
    }
    deleteCart = (cid) => {
        return cartModel.findByIdAndUpdate(cid, { products: [] })
    }

    addProductsToCart = async (cid, pid, quantity) => {
        const cart = await cartModel.find({ _id: cid }).lean();

        console.log(cart)
        if (cart) {

            const cID = await cartModel.find({ _id: cid }).lean()
            console.log(cID)
            const proadded = cID.find(({ product }) => product == pid)
            console.log(proadded)
            if (proadded) {
                console.log('el producto ya esta en el carrito')
            } else {

            }
            return cartModel.updateOne({ _id: cid }, { $push: { products: { product: new mongoose.Types.ObjectId(pid), quantity: quantity } } })


        }
    }
}


