const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getProducts, getProductsFromFile } = require('./products.controller');

// Declaring the path for the data persistence
const path = "./src/files/carrito.json";

// Function to get the carts
const getCarts = async (req, res) => {
    try{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const carts = JSON.parse(data);
            return carts  
        }else{
            return []
        }
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}


// Function to add a new cart
const newCart = async (req, res) => {
    const carts = await getCarts(); // Getting the carts
    try{

        // Creating a new cart
        const newCart = {
            id: uuidv4(),
            products: []
        }

        carts.push(newCart); // Pushing the new cart

        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));

        return res.status(200).json({message: 'Cart created successfully'});
    }catch(err){
        return res.status(404).json({message: err.message});
    }
}  

// Function to get the products from the cart

const getProductsByCart = async (req, res) => {
    try{    
        const {cid} = req.params; // Getting the cart id by params
        const carts = await getCarts(); // Getting the carts

        const cartFound = carts.find(cart => cart.id === cid); // Seraching a cart by id
        
        if(cartFound){
            return res.status(200).json({message: cartFound.products});
        }else{
            return res.status(404).json({message: 'Cart not found'});
        }

    }catch(err){
        return res.status(404).json({message: err.message});
    }
}

// Function to add a product to the cart

const addProdToCart = async (req, res) => {
    
    try{
        const {cid, pid} = req.params; // Getting the product id and the cart id from params
        const products = await getProductsFromFile(); // Getting the products 
        const carts = await getCarts(); // Getting the carts

        const prodFound = products.find(product => product.id === pid); // Serching the product by id
        const cartFound = carts.find(cart => cart.id === cid); // Serching the cart by id
        
        if(prodFound && cartFound){
            const prodWithSameId = cartFound.products.find(product => product.id === prodFound.id); // Serching if there is a product with same id

            if(prodWithSameId){
                prodWithSameId.quantity +=1; // Add the product quantity +1
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t')); // Write the new cart
                return res.status(200).json({message: 'Product added succesfully'})
            }

            // Creating the product to add to the cart
            let productToAdd = {
                id: prodFound.id,
                quantity: 1
            }

            cartFound.products.push(productToAdd); // Pushing the product to the cart

            await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t')); // Writing the new cart
            res.status(200).json({message: 'Product added successfully'})
        }else{
            res.status(404).json({message: 'Product or cart not found'});
        }
    }catch(e){
        return res.status(404).json({error: e.message})
    }
}

module.exports = {
    addProdToCart,
    newCart,
    getProductsByCart
};