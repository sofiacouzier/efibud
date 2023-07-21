import mongoose from "mongoose";

const collection = 'tickets';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    products: [],
    code: String,
    amount: Number,
    purchaser: String,
    purchase_datetime: {
        type: Date,
        default: Date.now
    }, //  se crea un campo: purchase_datetime


}, { timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" } })



const ticketModel = mongoose.model(collection, schema);

export default ticketModel;