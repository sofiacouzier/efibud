import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'products';

const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    status: {
        type: String,
        default: "active"
    },
    thumbnail: String,
    code: String,
    stock: String

}, { timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" } })

schema.plugin(mongoosePaginate);
const productModel = mongoose.model(collection, schema);


export default productModel;