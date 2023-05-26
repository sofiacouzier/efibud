import mongodb from "mongodb";
import { mongo } from "mongoose";
import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import ProductsManager from "./products.js";

const productsService = new ProductsManager();

//lsof -i tcp:8080               
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

    addProductsToCart = async (cid, pid, quantity) => {

        const cart = cartModel.findOne({ _id: cid }).lean()
        //console.log(cart)
        if (cart) {
            const productAdd = productsService.getProductsBy({ _id: pid }).lean()
            const addedProd = {
                "productTitle": (await productAdd).title,
                "quantity": quantity
            }
            //console.log(addedProd)
            //cart.updateOne({ products: [addedProd] })

            return cartModel.updateOne({ _id: cid }, { $push: { products: (addedProd) } })



        }
    }
}


