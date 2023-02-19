import { Router } from "express";
import { newCart, addProdToCart, getProductsByCart, getCarts } from "../controllers/carts.controller.js";

const router = Router();

// Routes for cart
router.get('/', getCarts);
router.get('/:cid', getProductsByCart);
router.post('/', newCart);
router.post('/:cid/product/:pid/', addProdToCart)

export default router;