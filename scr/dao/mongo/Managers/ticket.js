import mongoose from "mongoose";
import ProductsManager from "./products.js";
import ticketModel from "../models/ticket.js";
import cartModel from "../models/cart.js";

const productsService = new ProductsManager();

//lsof -i tcp:8080               
export default class CartsManager {

    getCartByID = (cid) => {
        return ticketModel.find({ _id: cid }).lean()
    }
    createCart = (ticket) => {
        return ticketModel.create(ticket)
    }


}


