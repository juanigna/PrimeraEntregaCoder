import mongoose from "mongoose";

const cartsColellection = "carts";

const cartSchema = new mongoose.Schema({
    products: Array
})

export const cartModel = mongoose.model(cartsColellection, cartSchema);