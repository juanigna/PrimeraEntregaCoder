import fs from 'fs';
import { productModel } from './models/Product.model.js';

class ProductDao {
    async find(){
        try{    
            const products = await productModel.find().lean();
            return products;
        }catch(e){
            console.log(e);
        }
    }

    async create(newProduct){
        try{
            const res = await productModel.create(newProduct);
            return res;
        }catch(e){
            console.log(e);
        }
    }
}

export default ProductDao;