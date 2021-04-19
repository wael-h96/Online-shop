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

admin.insertMany([{
    adminId: "9999",
    email: "admin@gmail.com",
    password: "1234",
    firstName: "David",
    lastName: "Sokola",
}])

module.exports = admin;