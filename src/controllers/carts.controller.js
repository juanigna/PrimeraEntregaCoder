const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { getProducts } = require('./products.controller');

const path = "./src/files/carrito.json";


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

const newCart = async (req, res) => {
    const carts = await getCarts();
    try{

        const newCart = {
            id: uuidv4(),
            products: []
        }

        carts.push(newCart);

        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));

        return res.status(200).json({message: 'Cart created successfully'});
    }catch(err){
        return res.status(404).json({message: err.message});
    }
}  

const getProuctsByCart = async (req, res) => {
    const {cid} = req.params;
    try{    
        // Getting the cart by cid
        const carts = await getCarts();

        const cartFound = carts.find(cart => cart.id === cid);
        
        if(cartFound){
            return res.status(200).json({message: cartFound.products});
        }else{
            return res.status(404).json({message: 'Cart not found'});
        }

    }catch(err){
        return res.status(404).json({message: err.message});
    }
}

const addProdToCart = async (req, res) => {
    
    try{
        const {cid, pid} = req.params;
        // Getting the product by pid
        const products = await getProducts();
        const prodFound = products.find(product => product.id === pid);

        // Getting the cart by cid
        const carts = await getCarts();

        const cartFound = carts.find(cart => cart.id === cid);
        
        if(prodFound && cartFound){
            const prodWithSameId = cartFound.products.find(product => product.id === prodFound.id);
            if(prodWithSameId){
                prodWithSameId.quantity +=1;
                await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
                return res.status(200).json({message: 'Product added succesfully'})
            }
            let productToAdd = {
                id: prodFound.id,
                quantity: 1
            }
            cartFound.products.push(productToAdd);

            await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
            res.status(200).json({message: 'Product added successfully'})
        }else{
            res.status(404).json({message: 'Product or cart not found'});
        }
    }catch(e){
        return res.status(404).json({message: e.message})
    }
}

module.exports = {
    addProdToCart,
    newCart,
    getProuctsByCart
};