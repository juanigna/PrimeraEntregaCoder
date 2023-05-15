import mongoose from "mongoose";

const usersCollection = "users";

const UserSchema = new mongoose.Schema({
    role: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    resetToken: String,
})

export const User = mongoose.model(usersCollection, UserSchema);
