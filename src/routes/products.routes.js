import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getMocksProds,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import uploader from "../utils.js";
import { passportCall } from "../utils/jwt.utils.js";
import { runProductMock } from "../services/mocks/productMock.js";

const router = Router();
const privateAccess = (req,res, next) => {
  const token = req.cookies.authToken;
  if(!token){
      return res.redirect('/login');
  }
  next();
}

const onlyAdmin = (req, res, next) => {
  const user = req.user;
  if(user.role !== "admin" || user.role !== "premium"){
    return res.status(401).json({message: "Unauthorized"})
  }
  next();
}
// Routes for products

router.get("/", passportCall("jwt"), privateAccess ,getProducts);
router.get("/:pid", getProductById);
router.get("/mock/prods", getMocksProds)
router.post("/", uploader.array("files", 5), passportCall("jwt"), onlyAdmin,addProduct);
router.put("/:pid", passportCall("jwt"), updateProduct);
router.delete("/:pid", passportCall("jwt"), deleteProduct);



export default router;
