const uploader = require("../utils");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const getProductsFromFile = async () => {
    try{
        if(fs.existsSync("./src/files/products.json")){
            const data = await fs.promises.readFile("./src/files/products.json", 'utf-8');
            const products = JSON.parse(data);
            return products  
        }else{
            return []
        }
    }catch(e){
        return e.message;
    }
}

const getProducts = async (req, res) => {
    try{   
        const products = await getProductsFromFile();
        const {limit} = req.query;
        if(limit){
            return res.status(200).json({products: products.slice(0, limit)});
        }

        res.status(200).json({products: products});
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}

const getProductById = async (req, res) => {
    try{
        const products = await getProductsFromFile();
        const {pid} = req.params;
        
        const prodFound = products.find(product => product.id === pid);
        if(prodFound){
            return res.status(200).json({product: prodFound});
        }else{
            return res.status(404).json({message: 'Product not found'});
        }

    }catch(e){
        return res.status(404).json({message: e.message});
    }
}

const addProduct = async (req, res) => {
    try{
        const products = await getProductsFromFile();
        const { name, description, code, price, status, stock, category} = req.body;

        if(!name || !description || !code || !price || !stock || !category || !status){
            return res.status(400).json({msg: "Completa todos los campos!"});
        }

        const prodWithSameCode = products.find(product => product.code === code);

        if(prodWithSameCode){
            return res.status(404).json({message: 'The code is used on other product!'})
        }
        const paths = [];

        if(req.files){
            req.files.forEach(file => {
                paths.push(file.path);
            })
        }

        const product = {
            id: uuidv4(),
            name,
            description,
            code,
            price,
            thumbnails: paths,
            status: status.length === 0 ? true : status,
            stock,
            category,
        }
        products.push(product);
        await fs.promises.writeFile("./src/files/products.json", JSON.stringify(products, null, '\t'));

        res.status(200).json({
            message: 'Product added successfully'
        })
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

const updateProduct = async (req, res) => {
    const products = await getProductsFromFile();
    const {pid} = req.params;
    const {...changes} = req.body 
    console.log(pid);
    try{
        const prodIndex = products.findIndex(product => String(product.id) === String(pid));
        console.log(prodIndex);
        if(prodIndex >= 0){
            const updatedProduct = {
                ...products[prodIndex],
                ...changes
            }

            products[prodIndex] = updatedProduct;
            await fs.promises.writeFile("./src/files/products.json", JSON.stringify(products, null, '\t'));

            res.status(200).json({message: "Product updated successfully"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const deleteProduct = async (req, res) => {
    try{
        const products = await getProductsFromFile();
        const {pid} = req.params;
        const prodFound = products.find(product => product.id === pid);
        if(prodFound){
            const prodIndex = products.indexOf(prodFound);
            products.splice(prodIndex, 1);
            await fs.promises.writeFile("./src/files/products.json", JSON.stringify(products, null, '\t'));
            return res.status(200).json({message: "Product deleted successfully"});
        }else{
            return res.status(404).json({message: "Product not found"});
        }

    }catch(err){
        return res.status(404).json({message: err.message});
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
}