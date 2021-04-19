const { ObjectId, ObjectID } = require('bson');
const express = require('express');
const { db } = require('../product/productSchema');
const router = express.Router()
const productDB = require("../product/productSchema")

router.post("/add-new-product", async (req, res) => {
    const newProduct = req.body

    try {

        const ifIdAlreadyExists = await productDB.find({ productId: newProduct.productId })
        if (ifIdAlreadyExists.length == 0) {

            const dbResponse = await productDB.insertMany([newProduct])
            res.json(dbResponse[0])
        } else {
            res.json({ message: "Id already exists" })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post("/update-product", async (req, res) => {

    const { productId, productName, price, categoryId, image } = req.body

    try {

        const dbResponse = await productDB.updateOne(
            { "productId": productId },
            { $set: { "productId": productId, "productName": productName, "price": price, "categoryId": categoryId, "image": image } }
        )

        if (dbResponse.ok) {
            res.json({ message: "Successfuly Updated" })
        } else {
            res.json({ message: "Updating Product Failed" })
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router;