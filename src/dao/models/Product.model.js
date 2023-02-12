import mongoose from "mongoose";

const productsColellection = "products";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    thumbnail: Array,
    status: Boolean,
    stock: Number,
    category: String
})

export const productModel = mongoose.model(productsColellection, productSchema);