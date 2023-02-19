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

    async findById(id){
        try{
            const product = await productModel.findById({_id: id})
            return product;
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

    async updateProduct(id, updatedProduct){
        try{
            const res = await productModel.findByIdAndUpdate({_id:id}, updatedProduct)
            console.log(res);
        }catch(e){
            console.log(e);
        }
    }

    async deleteProduct(id){
        try{
            const res = await productModel.findOneAndDelete({_id:id});
        }catch(e){
            console.log(e);
        }
    }
}

export default ProductDao;