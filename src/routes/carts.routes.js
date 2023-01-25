const { Router } = require("express");
const { newCart, addProdToCart, getProuctsByCart } = require("../controllers/carts.controller");

const router = Router();

router.get('/:cid', getProuctsByCart);
router.post('/', newCart);
router.post('/:cid/product/:pid/', addProdToCart)

module.exports = router;