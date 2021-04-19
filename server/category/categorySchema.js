const { truncate } = require("fs");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        categoryId: String,
        categoryName: String,
    },
    {
        collection: 'category',
        versionKey: false,
    }
)

const category = mongoose.model("category", customerSchema)

category.insertMany(
    { categoryId: "1", categoryName: "milkAndEggs" },
    { categoryId: "2", categoryName: "vegetablesAndFruits" },
    { categoryId: "3", categoryName: "meatAndFish" },
    { categoryId: "4", categoryName: "wineAndDrinks" },
)

module.exports = category;