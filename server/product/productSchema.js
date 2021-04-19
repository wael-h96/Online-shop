const { truncate } = require("fs");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        productId: String,
        productName: String,
        categoryId: String,
        price: Number,
        image: String,
    },
    {
        collection: 'product',
        versionKey: false,
    }
)

const product = mongoose.model("product", productSchema)
module.exports = product;