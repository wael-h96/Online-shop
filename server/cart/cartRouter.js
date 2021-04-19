const express = require('express');
const cart = require('./cartSchema');
const router = express.Router()
const cartDB = require('./cartSchema');
const session = require("express-session")

router.post("/add-product", async (req, res) => {

    const { product, customerId, quantity } = req.body
    const { _id, productName, price } = product
    const newProduct = { productId: _id, productName, price, quantity }
    let productsArray = []
    let totalPrice = 0;
    const date = new Date()
    try {
        console.log("from cart:", req.session)
        const customerCart = await cartDB.find({ customerId })
        const cartLength = customerCart.length

        if (customerCart.length == 0 || customerCart[cartLength - 1].isDone) {
            productsArray.push(newProduct)
            totalPrice += price * quantity
            const cart = await cartDB.insertMany({ customerId, date, totalPrice, products: productsArray })

        } else {
            const cartId = customerCart[cartLength - 1]._id
            totalPrice += customerCart[cartLength - 1].totalPrice + price * quantity
            const ifProductAlreadyExists = await customerCart[cartLength - 1].products.filter(p => p.productName === productName)
            if (ifProductAlreadyExists.length > 0) {
                const newQuantity = quantity + ifProductAlreadyExists[0].quantity
                const updateCollection = await cartDB.updateOne({ customerId, _id: cartId, "products.productName": productName },
                    { $set: { "products.$.quantity": newQuantity, totalPrice } })

            } else {
                productsArray = [...customerCart[cartLength - 1].products, newProduct]
                const updatedCollection = await cartDB.updateOne({ customerId, _id: cartId }, { $set: { "products": productsArray, totalPrice } })

            }
        }

        res.json(newProduct)

    } catch (err) {
        console.log(err)
    }
})


router.post("/delete-product", async (req, res) => {
    const { product, customerId } = req.body
    
    try {
        const cartDetails = await cartDB.find({ customerId })
        const dbDeleteRes = await cartDB.updateOne(
            { customerId, isDone: false },
            { $pull: { products: product } },
            { multi: true }
        )

        if (dbDeleteRes.ok) {
            const totalPrice = cartDetails[cartDetails.length - 1].totalPrice - (product.quantity * product.price)
            await cartDB.updateOne({ customerId, isDone: false }, { $set: { "totalPrice": totalPrice } })
            const theRestProducts = await cartDB.find({ customerId })
            res.json({ restProducts: theRestProducts[theRestProducts.length - 1].products, totalPrice })
        } else {
            res.json({ err: "couldn't delete this product" })
        }

    } catch (err) {
        console.log(err)
    }
})


router.post("/delete-all", async (req, res) => {
    const customerId = req.body

    try {
        const cartToDelete = await cartDB.find(customerId)
        const _id = cartToDeleteId = cartToDelete[cartToDelete.length - 1]._id
        const dbResponse = await cartDB.deleteMany({ _id })

        if (dbResponse.ok) {
            res.json([])
        }

    } catch (err) {
        console.log(err)
    }
})


router.get("/:customerId", async (req, res) => {
    const customerId = req.params.customerId

    try {
        const customerCart = await cartDB.find({ customerId })
        if (customerCart[customerCart.length - 1].isDone) {//means that this cart is done
            res.json([])

        } else {
            res.json(customerCart)
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router;