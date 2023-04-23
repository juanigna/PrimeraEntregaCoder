import mongoose from "mongoose";

const cartsColellection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datatime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String
    }

})

export const ticketModel = mongoose.model(cartsColellection, ticketSchema);