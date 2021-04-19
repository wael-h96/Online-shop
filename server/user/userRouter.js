const express = require('express')
const router = express.Router()
const userDB = require("./userSchema")
const cartDB = require("../cart/cartSchema")
const orderDB = require("../order/orderSchema")
const bcrypt = require("bcrypt");
const session = require('express-session')

router.post("/sign-up-1", async (req, res) => {
    const { userId, email, password } = req.body

    try {
        const dbResponse = await userDB.find({ userId })//checking if exists
        console.log(dbResponse);
        if (dbResponse.length === 0) {//this means there is no such id yet (not exist)
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUserToAdd = {
                userId,
                email,
                password: hashedPassword,
            };
            const dbRes = await userDB.insertMany(newUserToAdd);
            res.json({ message: "success" })
        } else {
            res.json({ message: "ID is already exists" })
        }
    } catch (err) {
        res.json(err)
    }
});

router.post("/sign-up-2", async (req, res) => {
    const { userId, city, street, firstName, lastName } = req.body
    try {
        const dbResponse = await userDB.updateOne({ userId }, { $set: { city, street, firstName, lastName } })
        res.json(dbResponse)
    } catch (err) {
        res.json(err)
    }
})

router.post("/log-in", async (req, res) => {
    const { user: { userName, password } } = req.body

    try {
        const ifUserExists = await userDB.find({ email: userName })

        if (ifUserExists.length > 0) {
            await bcrypt.compare(password, ifUserExists[0].password, (err, match) => {
                if (err) {
                    res.json({ error: err.message })
                }
                else {
                    if (match) {

                        // const user = remove(ifUserExists[0], ["password"])
                        req.session.loggedInUser = ifUserExists[0].userId
                        res.cookie("userId", ifUserExists[0].userId)

                        console.log("session from server", req.session)
                        res.json({ message: "User successfuly logged-in", loggedInUser: ifUserExists[0] })

                    } else {
                        res.json({ error: "Incorrect username or password" })
                    }
                }
            })
        } else {
            res.json({ error: "Incorrect username or password" })
        }

    } catch (err) {

    }
})

router.get("/:customerId", async (req, res) => {
    const userId = req.params.customerId

    try {

        const userDetails = await userDB.find({ userId })
        res.json(userDetails[0].firstName)
    } catch (err) {
        console.log(err)
    }
})

router.get("/get-adress/:customerId/:field", async (req, res) => {

    const userId = req.params.customerId
    const field = req.params.field

    try {

        const userData = await userDB.find({ userId })
        if (field === "street")
            res.json(userData[0].street)
        else {
            res.json(userData[0].city)
        }

    } catch (err) {
        console.log(err)
    }
})

router.get("/cart&orders/:customerId", async (req, res) => {
    const userId = customerId = req.params.customerId

    try {

        const cartDbResponse = await cartDB.find({ customerId })
        const orderDbResponse = await orderDB.find({ userId })
        res.json({ cartDbResponse, orderDbResponse })

    } catch (err) {
        console.log(err)
    }
})

const remove = (obj, properties) => {
    const result = { ...obj };
    for (const property of properties) {
        delete result[property];
    }
    return result;
}


module.exports = router;