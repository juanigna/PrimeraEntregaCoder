import mongoose from 'mongoose';
import config from '../config/config.js';

export let Products;
export let Carts;
switch (config.persistense) {
    case "MONGO":
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://juani:${process.env.MONGO_PASS}@cluster0.zf75rie.mongodb.net/?retryWrites=true&w=majority`, (error) => {
            if (error) {
                console.log('error connecting to database');
            }
            console.log('connected to database')
        })

        const { default: ProductsMongo } = await import('./products.dao.js');
        const { default: CartsMongo } = await import('./carts.dao.js');
        Products = ProductsMongo
        Carts = CartsMongo;
        break;
    case "MEMORY":
        const { default: ProductsMemory } = await import('./memory/products.memory.js');
        Products = ProductsMemory;
        break;
}