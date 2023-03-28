import { Router } from "express";
import passport from "passport";
import { userPost } from "../users/users.controller.js";

const router = Router();

router.post("/", userPost);

router.get("/failedRegister", async (req, res) => {
  res.send({ message: "Fallo el registro" });
});

router.get("/successRegister", async (req, res) => {
  console.log("User registered");
  res.send({ message: "User registered!" });
});

export default router;
