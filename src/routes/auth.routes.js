import { Router } from "express";
import { loginLogic } from '../auth/controller.auth.js';

const router = Router();

router.post('/', loginLogic);

export default router;