import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";
import { SECRET_KEY, generateToken } from "../utils/jwt.utils.js";
import bcryptjs from "bcrypt";
import { logger } from "../utils/logger.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const loginLogic = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });
    const comparePassword = bcryptjs.compareSync(password, user.password);
    
    if (!comparePassword)  res.status(403).json({ error: "Contraseña incorrecta" });

    const token = generateToken(user);
    res.cookie("authToken", token, { httpOnly: true });
    return res.json({ token });
  } catch (error) {
    console.error("Se ha producido un error: " + error.message);
  }
};

export const forgotPassswordLogic = async (req, res) => {
  try {
    const { email } = req.body;
    
    let user = await User.findOne({ email });
    if(!user){
      res.status(404).json({message: "No existe este usuario"})
      logger.warning("No existe este usuario")
    }
   
    const token = jwt.sign({ user: user }, SECRET_KEY, {expiresIn: "15m"})
    let verificationLink = `http://localhost:8080/auth/resetPassword/${token}/${user._id}`
    user.resetToken = token;
    console.log("Click aqui para cambiar la contraseña: ", verificationLink)
    //Save user
    await user.save();
    res.status(200).json({ verificationLink});
  } catch (e) {
    console.error(e);
  }
};
