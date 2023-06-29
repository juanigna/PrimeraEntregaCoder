import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { cartModel } from '../dao/models/Cart.model.js';
import { productModel } from '../dao/models/Product.model.js';
import { cartService, productService } from '../dao/repositories/index.js';
// Declaring the path for the data persistence
const path = "./src/files/carrito.json";

// Function to get the carts
export const getCarts = async (req, res) => {
    try {
        const carts = await cartService.getCarts();
        return res.status(200).json({ message: carts })
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
}


// Function to add a new cart
export const newCart = async (req, res) => {
    const carts = await cartService.getCarts(); // Getting the carts
    try {
        // Creating a new cart
        const newCart = {
            id: uuidv4(),
            products: []
        }

        const cartCreated = await cartService.createCart(newCart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));

        return res.status(200).json({ message: cartCreated });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

// Function to get the products from the cart

export const getProductsByCart = async (req, res) => {
    try {
        const { cid } = req.params; // Getting the cart id by params
        const cartFound = await cartService.getCartById(cid)
        const data = {
            ...cartFound,
            cartId: cid,
            req: req
        };
        if (cartFound) {
            res.render('cart.handlebars', { data });
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

// Function to add a product to the cart

export const addProdToCart = async (req, res) => {

    try {
        const { cid, pid } = req.params; // Getting the product id and the cart id from params

        const prodFound = await productService.getProductById(pid) // Serching the product by id
        const cartFound = await cartService.getCartById(cid);
        if (prodFound && cartFound) {
            const prodWithSameId = cartFound.products.findIndex(p => String(p.id._id) === pid); // Serching if there is a product with same id
            if (prodWithSameId >= 0) {
                cartFound.products[prodWithSameId].quantity += 1;// Add the product quantity +1
                cartFound.products[prodWithSameId].amount += prodFound.price;// Add the product quantity +1
                await cartModel.findOneAndUpdate({ _id: cid }, cartFound)// Write the new cart
                return res.status(200).json({ message: 'Product alredy added' })
            }
            // Creating the product to add to the cart
            let productToAdd = {
                id: prodFound._id,
                quantity: 1,
                amount: prodFound.price
            }
            await cartService.updateCartProdById(cid, productToAdd);
            // const res = await Cart.updateCartProdById(cid, cartFound);
            res.status(200).json({ message: 'Product added successfullyyy' })
        } else {
            res.status(404).json({ message: 'Product or cart not found' });
        }
    } catch (e) {
        return res.status(404).json({ error: e.message })
    }
}

export const purchaseCart = async (req, res) => {
    const { cid } = req.params; // Getting the cart id from params
    try {
        const user = req.user;
        console.log(user)

        const cartFound = await cartService.getCartById(cid);
        if (!cartFound) return res.status(404).json({ message: 'Cart not found' });

        const productsFromCart = cartFound.products;
        let prodWithNoStock = []
        productsFromCart.map(async (prod, i) => {
            const prodFromCartId = await productService.getProductById(String(prod.id._id))
            if (prodFromCartId.stock >= prod.quantity) {
                const totalPrice = prod.amount;
                const newStock = prodFromCartId.stock - prod.quantity
                await productModel.findOneAndUpdate({ _id: prod.id._id }, { stock: newStock })

                await cartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { id: prod.id._id } } })
                const data = {
                    code: uuidv4(),
                    purchase_datatime: new Date(),
                    amount: totalPrice,
                    purchaser: req.user.email

                }
                const res  = await cartService.payCart(data);
                res.status(200).json({message: res})
            } else {
                return res.status(400).json({message: "Out of stock"})
            }
        })

    }
    catch (error) {
        return res.status(404).json({ error: error.message })
    }
}