import fs from 'fs';
import { cartModel } from './models/Cart.model.js';
import { ticketModel } from './models/Ticket.model.js';


class CartDao {
    async getCarts() {
        try {
            const carts = await cartModel.find().lean();
            return carts
        } catch (e) {
            console.log(e.message)
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartModel.findById({ "_id": id }).populate('products.id').lean();
            return cart
        } catch (e) {
            console.log(e?.message)
        }
    }

    async createCart(data) {
        try {
            const res = await cartModel.create(data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async updateCartProdById(id, productAdded) {
        try {
            const res = await cartModel.updateOne({ _id: id }, { $push: { products: productAdded } });
            return res
        } catch (e) {
            console.log(e.message);
        }
    }

    async payCart(data) {
        const res = await ticketModel.create(data)
        return res
    }
}

export default CartDao;