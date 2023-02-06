import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    usermail: { type: String, required: true, unique: true},
    password: { type: String, required: true }
})

module.exports = mongoose.model("User", userSchema);