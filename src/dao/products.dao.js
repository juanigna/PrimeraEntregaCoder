import fs from 'fs';
import { productModel } from './models/Product.model.js';


class ProductDao {
    async paginate(req, res ,page,limit, query, sort){
        try{
            const data = await productModel.paginate(query, {limit: limit, sort: sort,page: page, lean:true});
            const {docs, totalDocs, totalPages, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage} = data;
            const nextPageLink = hasNextPage ? `${req.baseUrl}?limit=${limit}&page=${nextPage}&q=${encodeURIComponent(JSON.stringify(query))}` : null;
            const prevPageLink = hasPrevPage ? `${req.baseUrl}?limit=${limit}&page=${prevPage}&q=${encodeURIComponent(JSON.stringify(query))}` : null;
            
            const res = {
                status: 'success',
                payload: docs,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: prevPageLink,
                nextLink: nextPageLink,
            }

            return res;
        }catch(err){
            console.log(err);
        }
        
    }

    async find(){
        try{    
            const products = await productModel.find();

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