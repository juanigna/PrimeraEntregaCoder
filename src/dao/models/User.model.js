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
    last_connection: {
		type: {
			register_date: Date,
			login_date: Date,
			logout_date: Date,
		},
		default: {
			register_date: Date(),
			login_date: Date(),
			logout_date: Date(),
		},
	},
    cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'cart',
	},
})

export const User = mongoose.model(usersCollection, UserSchema);
