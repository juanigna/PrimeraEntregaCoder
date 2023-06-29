import { Router } from "express";
import { newCart, addProdToCart, getProductsByCart, getCarts, purchaseCart } from "../controllers/carts.controller.js";
import { authTokenCookies, passportCall } from '../utils/jwt.utils.js';

const router = Router();

// Routes for cart
router.get('/all', getCarts);
router.get('/:cid', getProductsByCart);
router.post('/', newCart);
router.post('/:cid/product/:pid/', addProdToCart, authTokenCookies)
router.post('/:cid/purchase', authTokenCookies,purchaseCart)


export default router;