const express = require('express')
const router = express.Router()
const productDB = require("./productSchema");

router.get("/", async (req, res) => {
    try {

        const dbResponse = await productDB.find()
        console.log("session",req.session.loggedInUser)
        res.json(dbResponse)

    } catch (err) {
        console.log(err)
    }
})

router.get("/fetchProducts/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId
    try {
        const dbResponse = await productDB.find({ categoryId })
        if (dbResponse.length > 0) {
            res.json(dbResponse)
        } else {
            res.json([])
        }
    } catch (err) {
        console.log(err)
    }
})

router.get("/get-product/:productName", async (req, res) => {
    const productName = req.params.productName

    try {

        const ifProductFound = await productDB.find({ productName })
        if (ifProductFound.length > 0) {//product found
            res.json(ifProductFound)
        } else {
            res.json([])
        }

    } catch (err) {
        console.log(err)
    }


})

module.exports = router;