const mongoose = require("mongoose");
const product = require("../product/productSchema")
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        customerId: String,
        createdAt: {
            type: Date,
            default: Date.now()
        },
        totalPrice: Number,
        products: {
            type: Array,
        },
        isDone: {
            type: Boolean,
            default: false,
        }

    },
    {
        collection: 'cart',
        versionKey: false,
    }
)

const cart = mongoose.model("cart", cartSchema)

module.exports = cart;