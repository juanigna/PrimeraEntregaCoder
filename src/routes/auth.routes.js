import { Router } from "express";
import passport from "passport";
import { forgotPassswordLogic, loginLogic } from "../auth/controller.auth.js";
import { User } from "../dao/models/User.model.js";
import dotenv from "dotenv";
import { createHash } from "../utils/cryptPassword.js";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../utils/jwt.utils.js";
import bcryptjs from "bcrypt";
dotenv.config();
const router = Router();

router.post("/", loginLogic);

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

router.post("/forgotPassword", forgotPassswordLogic);

router.get('/resetPassword/:token/:id', async (req, res) => {
  try{
    let user = await User.findById({_id: req.params.id})
    const secret = SECRET_KEY;
    res.render('resetPassword.handlebars')
  }catch(err){
    res.status(400).json({msg: err})
  }
})
router.post('/resetPassword', async (req, res) => {
  const {password, id, token} = req.body;
  try{
    let user = await User.findById({_id: id})
    const payload = jwt.verify(token,SECRET_KEY ); 
    let isTheSame = bcryptjs.compareSync(password, user.password);
    if(!isTheSame){
      user.password = createHash(password);
      await user.save();
      res.status(200).json({msg: "Contraseña cambiada con exito"})
    }
    res.status(400).json({msg: "La contraseña no puede ser la misma"})
  }catch(err){
    res.status(400).json({msg: err.message})
  }
})

router.get("/failedLogin", async (req, res) => {
  console.log("Fallo el login");
  res.send({ message: "Fallo el login" });
});


router.get('/logout', async (req, res) => {
  try{
    res.status(202).clearCookie("authToken"); 
    res.redirect("/login");
  }catch(err){
    res.status(400).json({msg: err})
  }
})
export default router;
