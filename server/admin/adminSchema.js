const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        adminId: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
    },
    {
        collection: 'admin',
        versionKey: false,
    }
)

const admin = mongoose.model("admin", adminSchema)

module.exports = admin;