import { Router } from "express";
import { getUpdatedProducts } from "../controllers/realTimeProducts.controller.js";

const router = Router();

router.get('/', getUpdatedProducts);

export default router;