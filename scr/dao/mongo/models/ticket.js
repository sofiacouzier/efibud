import mongoose from "mongoose";

const collection = 'ticket';

const schema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'carts'

            }
        }
        ],
        default: []
    },
    amount: Number,
    purchaser: String,
    code: String,
    purchase_datetime: Date.now()
}, { timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" } })

schema.pre('find', function () {
    this.populate('products.product')
})

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;