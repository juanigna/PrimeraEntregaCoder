import fs from 'fs';
import { cartModel } from './models/Cart.model.js';


class CartDao {
    async getCarts(){
        try{
            const carts = await cartModel.find().lean();
            return carts
        }catch(e){
            console.log(e.message)
        }
    }

    async getCartById(id){
        try{
            const cart = await cartModel.findById({"_id": id})
            return cart
        }catch(e){
            console.log(e?.message)
        }
    }

    async createCart(data){
        try{
            const res = await cartModel.create(data);
            return res;
        }catch(e){
            console.log(e);
        }
    }

    async updateCartProdById(id, productAdded){
        try{
            const res = await cartModel.updateOne({_id: id}, {$push: {products: productAdded}});
            console.log(res);
        }catch(e){
            console.log(e.message);
        }
    }
}

export default CartDao;