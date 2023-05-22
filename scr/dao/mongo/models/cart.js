import mongoose from "mongoose";


const collection = 'carts';

const schema = new mongoose.Schema({
    products: [],
    status: {
        type: String,
        default: "active"
    }

}, { timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" } })

const cartModel = mongoose.model(collection, schema);

export default cartModel;