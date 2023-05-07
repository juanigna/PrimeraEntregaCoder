import mongoose from 'mongoose';
import config from '../config/config.js';

export let Products;
export let Carts;
switch (config.persistense) {
    case "MONGO":
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://juani:${process.env.MONGO_PASS}@cluster0.3wutrwm.mongodb.net/test`).then(() => {
            console.log("Connected to DB")
        }).catch((err) => {
            console.log("Error trying to connect to DB")
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