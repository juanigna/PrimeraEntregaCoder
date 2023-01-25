const { Router } = require("express");
const { newCart, addProdToCart, getProductsByCart } = require("../controllers/carts.controller");

const router = Router();

// Routes for cart
router.get('/:cid', getProductsByCart);
router.post('/', newCart);
router.post('/:cid/product/:pid/', addProdToCart)

module.exports = router;