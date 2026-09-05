const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ["cake", "cookie", "drink"]
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

    featured: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Product", productSchema);