import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import uploader from "../utils.js";

const router = Router();

// Routes for products

router.get('/', getProducts);
router.get('/:pid', getProductById)
router.post('/', uploader.array('files', 5) , addProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;