import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productsColellection, productSchema);