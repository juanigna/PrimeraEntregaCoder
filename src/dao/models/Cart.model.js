import mongoose from "mongoose";
import { productModel } from "./Product.model.js";

const cartsColellection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productModel,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            amount: {
                type: Number
            }
        }
    ]
})

export const cartModel = mongoose.model(cartsColellection, cartSchema);