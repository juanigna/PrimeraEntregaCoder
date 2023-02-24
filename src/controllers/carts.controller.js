import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import CartDao from '../dao/carts.dao.js';
import { cartModel } from '../dao/models/Cart.model.js';
import ProductDao from '../dao/products.dao.js';
import { getProducts } from './products.controller.js';
const Cart = new CartDao();
const Product = new ProductDao();
// Declaring the path for the data persistence
const path = "./src/files/carrito.json";

// Function to get the carts
export const getCarts = async (req, res) => {
    try{        
        const carts = await Cart.getCarts();
        return res.status(200).json({message: carts})  
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}


// Function to add a new cart
export const newCart = async (req, res) => {
    const carts = await Cart.getCarts(); // Getting the carts
    try{

        // Creating a new cart
        const newCart = {
            id: uuidv4(),
            products: []
        }

        Cart.createCart(newCart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));

        return res.status(200).json({message: 'Cart created successfully'});
    }catch(err){
        return res.status(404).json({message: err.message});
    }
}  

// Function to get the products from the cart

export const getProductsByCart = async (req, res) => {
    try{    
        const {cid} = req.params; // Getting the cart id by params
        const cartFound = await Cart.getCartById(cid)
        const data = {
            ...cartFound,
            cartId: cid,
            req: req
        };
        if(cartFound){
            res.render('cart.handlebars', {data});
        }else{
            return res.status(404).json({message: 'Cart not found'});
        }

    }catch(err){
        return res.status(404).json({message: err.message});
    }
}

// Function to add a product to the cart

export const addProdToCart = async (req, res) => {
    
    try{
        const {cid, pid} = req.params; // Getting the product id and the cart id from params

        const prodFound = await Product.findById(pid) // Serching the product by id
        const cartFound = await Cart.getCartById(cid);
        
        if(prodFound && cartFound){
            const prodWithSameId = cartFound.products.findIndex(p => p.id.toString() === pid); // Serching if there is a product with same id
            console.log(prodWithSameId)
            if(prodWithSameId >= 0){
                cartFound.products[prodWithSameId].quantity += 1;// Add the product quantity +1
                await cartModel.findOneAndUpdate({_id: cid}, cartFound)// Write the new cart
                return res.status(200).json({message: 'Product alredy added'})
            }

            // Creating the product to add to the cart
            let productToAdd = {
                id: prodFound._id,
                quantity: 1
            }
            await Cart.updateCartProdById(cid, productToAdd);
            // const res = await Cart.updateCartProdById(cid, cartFound);
            res.status(200).json({message: 'Product added successfullyyy'})
        }else{
            res.status(404  ).json({message: 'Product or cart not found'});
        }
    }catch(e){
        return res.status(404).json({error: e.message})
    }
}

