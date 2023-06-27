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
import { authTokenCookies, passportCall } from "../utils/jwt.utils.js";
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
  console.log(req.user.role)
  if(req.user.role === "premium"){
    next();
  }else{
    return res.status(401).json({message: "Unauthorized"})
  }
  
}

const onlyPremium = (req, res, next) => {
  console.log(req.user.role)
  if(req.user.role !== "admin"){
    next();
  }else{
    return res.status(401).json({message: "Unauthorized"})
  }
}
// Routes for products

router.get("/", passportCall("jwt") , authTokenCookies ,getProducts);
router.get("/:pid", getProductById, authTokenCookies);
router.get("/mock/prods", getMocksProds)
router.post("/", uploader.array("files", 5), passportCall("jwt"), onlyAdmin, onlyPremium,addProduct);
router.put("/update/:pid", passportCall("jwt"), updateProduct);
router.delete("/delete/:pid", passportCall("jwt"), deleteProduct);



export default router;
