import { Router } from "express";
import { newCart, addProdToCart, getProductsByCart, getCarts, purchaseCart } from "../controllers/carts.controller.js";

const router = Router();

// Routes for cart
router.get('/', getCarts);
router.get('/:cid', getProductsByCart);
router.post('/', newCart);
router.post('/:cid/product/:pid/', addProdToCart)
router.post('/:cid/purchase', purchaseCart)


export default router;