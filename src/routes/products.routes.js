const { Router } = require("express");
const { deleteProduct, getProducts, updateProduct, addProduct, getProductById } = require("../controllers/products.controller");
const uploader = require("../utils");

const router = Router();

// Routes for products

router.get('/', getProducts);
router.get('/:pid', getProductById)
router.post('/', uploader.array('files', 5) , addProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;