import { Router } from "express";
import { profileAuth } from '../utils/auth.js';
import { login, logout, profile, signUp } from '../viewsTemplate/controller.viewTemplates.js';

const router = Router();

router.get('/signup', signUp);
router.get('/login', login);
router.get('/logout', logout);
router.get('/profile', profile)

export default router;