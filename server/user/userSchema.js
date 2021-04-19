const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: String,
        email: String,
        password: String,
        city: String,
        street: String,
        firstName: String,
        lastName: String,
        role: {
            type: String,
            default: "customer"
        }
    },
    {
        collection: 'user',
        versionKey: false,
    }
)

const user = mongoose.model("user", userSchema)


module.exports = user;