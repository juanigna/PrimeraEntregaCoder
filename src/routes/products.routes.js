import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import uploader from "../utils.js";
import { authTokenCookies, passportCall } from "../utils/jwt.utils.js";

const router = Router();

// Routes for products

router.get("/", passportCall("jwt") ,getProducts);
router.get("/:pid", getProductById);
router.post("/", uploader.array("files", 5), passportCall("jwt"), addProduct);
router.put("/:pid", passportCall("jwt"), updateProduct);
router.delete("/:pid", deleteProduct);

export default router;
