import mongoose from "mongoose";


const collection = 'carts';

const schema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'

            },
            quantity: {
                type: String,
                default: 1
            }
        }
        ],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "active"
    }
}, { timestamps: { createdAt: "craeted_at", updatedAt: "updated_at" } })

schema.pre('find', function () {
    this.populate('products.product')
})

const cartModel = mongoose.model(collection, schema);

export default cartModel;