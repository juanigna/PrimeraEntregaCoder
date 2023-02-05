import { Router } from "express";
import { getProductsFromFile } from "./products.controller.js";

export const getUpdatedProducts = async (req, res) => {
    const products = await getProductsFromFile();
    global.io.emit('listUpdatedProducts', products);
    res.render('realTimeProducts', { products });
}