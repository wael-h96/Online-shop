const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: String,
        cartId: String,
        totalPrice: Number,
        city: String,
        street: String,
        shippingDate: Date,
        orderDate: Date,
        creditCard: String,
    },
    {
        collection: 'order',
        versionKey: false,
    }
)

const order = mongoose.model("order", orderSchema)

module.exports = order;