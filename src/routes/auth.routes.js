import { Router } from "express";
import passport from "passport";
import { forgotPassswordLogic, loginLogic } from "../auth/controller.auth.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/auth/failedLogin" }),
  loginLogic
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  }
);

router.get(
  "/githubLogin",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("hi");
    try {
      req.session.user = req.user;
      res.redirect("/api/products");
    } catch (err) {
      console.log(err);
    }
  }
);

router.patch("/forgotPassword", forgotPassswordLogic);
router.get("/failedLogin", async (req, res) => {
  console.log("Fallo el login");
  res.send({ message: "Fallo el login" });
});

export default router;
