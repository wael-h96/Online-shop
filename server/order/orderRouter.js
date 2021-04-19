const express = require('express');
const router = express.Router();
const cartDB = require("../cart/cartSchema");
const orderDB = require("./orderSchema");
const userDB = require('../user/userSchema')
const fs = require("fs");
const fp = require("path")


router.get("/", async (req, res) => {
    try {

        const dbResponse = await orderDB.find()
        res.json(dbResponse)

    } catch (err) {
        console.log(err)
    }
})

router.post("/submit-order", async (req, res) => {
    const { order, customerId } = req.body
    const shippingDate = order.shippingDate

    try {

        const userCart = await cartDB.find({ customerId })
        const cartId = userCart[userCart.length - 1]._id
        const ordersInSameDate = await orderDB.find({ shippingDate })

        if (ordersInSameDate.length == 3) {
            res.json({ err: "Shipping in this date is full , please choose another date" })

        } else {
            await cartDB.updateOne({ _id: cartId }, { $set: { "isDone": "true" } })
            const orderDbResponse = await orderDB.insertMany([
                {
                    userId: customerId,
                    cartId: userCart[userCart.length - 1]._id,
                    totalPrice: userCart[userCart.length - 1].totalPrice,
                    city: order.city,
                    street: order.street,
                    shippingDate: order.shippingDate,
                    orderDate: Date.now(),
                    creditCard: order.creditCard,
                }
            ])

            res.json(orderDbResponse[0])
        }

    } catch (err) {
        console.log(err)
    }
})

router.get("/download-receipt/:customerId", async (req, res) => {
    const customerId = req.params.customerId
    let products = []
    let path = fp.join(__dirname, `../invoice/`)

    try {

        const cart = await cartDB.find({ customerId })
        const cartId = cart[cart.length - 1]._id
        const orderDetails = await orderDB.find({ cartId })
        const userInfo = await userDB.find({ userId: customerId })
        const products = cart[cart.length - 1].products

        const receiptFile = fs.createWriteStream(path + `${customerId}.txt`, { flags: 'w' });
        receiptFile.write("Customer Name: " + userInfo[0].firstName + ' ' + userInfo[0].lastName + '\n')
        receiptFile.write("Product Name" + '\t' + "Quantity" + '\t' + "Price" + '\n')
        products.forEach(item => {
            let json = JSON.stringify(item)
            receiptFile.write(item.productName + '\t\t\t' + item.quantity + '\t\t\t' + item.price * item.quantity + '\n')
        }
        );
        receiptFile.write("Total Price : " + orderDetails[0].totalPrice)


    } catch (err) {
        console.log(err)
    }
})


module.exports = router