const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// Declaring the path for the data persistence

const path = "./src/files/products.json";

//Function to get the products from fs
const getProductsFromFile = async () => {
    try{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const products = JSON.parse(data);
            return products  
        }else{
            return []
        }
    }catch(e){
        return e.message;
    }
}

// Function to get the products
const getProducts = async (req, res) => {
    try{   
        
        const products = await getProductsFromFile(); // Getting the products from fs
        const {limit} = req.query; // Getting the limit query
        if(limit){
            return res.status(200).json({products: products.slice(0, limit)});
        }

        res.status(200).json({products: products});
    }catch(e){
        return res.status(404).json({message: e.message});
    }
}

// Function to get the product by id
const getProductById = async (req, res) => {
    try{
        const products = await getProductsFromFile(); // Getting the products from fs
        const {pid} = req.params; // Getting the productId from params
        
        const prodFound = products.find(product => product.id === pid); // Searching for the product by id
        if(prodFound){
            return res.status(200).json({product: prodFound});
        }else{
            return res.status(404).json({message: 'Product not found'});
        }

    }catch(e){
        return res.status(404).json({message: e.message});
    }
}


//Function to add a product

const addProduct = async (req, res) => {
    try{
        const products = await getProductsFromFile(); // Getting the products from fs
        const { name, description, code, price, status, stock, category} = req.body; // Getting the data from de body

        if(!name || !description || !code || !price || !stock  || !category || !status){
            return res.status(400).json({msg: "Completa todos los campos!"});
        }

        const prodWithSameCode = products.find(product => product.code === code); // Searching if there a product whith the same id

        if(prodWithSameCode){
            return res.status(404).json({message: 'The code is used on other product!'})
        }
        const paths = [];

        if(req.files){
            req.files.forEach(file => {
                paths.push(file.path);
            })
        }   

        // Creating the product object

        const product = {
            id: uuidv4(),
            name,
            description,
            code,
            price,
            thumbnails: paths,
            status: !status ? true : Boolean(status),
            stock,
            category,
        }

        products.push(product); // Pushing to the array of products
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));

        res.status(200).json({
            message: 'Product added successfully'
        })
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

//Function to update a product

const updateProduct = async (req, res) => {
    const products = await getProductsFromFile(); // Getting the products from fs
    const {pid} = req.params; // Getting the product id from params
    const {...changes} = req.body  // Getting the changes to update
    console.log(pid);
    try{
        const prodIndex = products.findIndex(product => String(product.id) === String(pid)); // Searcging for the product index
        if(prodIndex >= 0){

            // Creating the updated product
            const updatedProduct = {
                ...products[prodIndex],
                ...changes
            }


            products[prodIndex] = updatedProduct; //Remplazing the product

            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t')); // Writing the new product

            res.status(200).json({message: "Product updated successfully"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

//Function to delete a product

const deleteProduct = async (req, res) => {
    try{
        const products = await getProductsFromFile(); // Getting the products from fs
        const {pid} = req.params; // Getting the product id from the params
        const prodFound = products.find(product => product.id === pid); //Seraching the product by id
        if(prodFound){
            const prodIndex = products.indexOf(prodFound); // Index of the product
            products.splice(prodIndex, 1); // Remove the product
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t')); // Write the product
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
    getProductById,
    getProductsFromFile
}