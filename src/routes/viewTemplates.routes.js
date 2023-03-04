import { Router } from "express";
import { login, logout, signUp } from '../viewsTemplate/controller.viewTemplates.js';

const router = Router();

router.get('/signup', signUp);
router.get('/login', login);
router.get('/logout', logout);

export default router;