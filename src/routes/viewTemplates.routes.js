import { Router } from "express";
import { profileAuth } from "../utils/auth.js";
import {
  forgotPassword,
  login,
  logout,
  profile,
  signUp,
} from "../viewsTemplate/controller.viewTemplates.js";

const router = Router();

router.get("/signup", signUp);
router.get("/login", login);
router.get("/logout", logout);
router.get("/forgotPassword", forgotPassword);
router.get("/profile", profile);

export default router;
