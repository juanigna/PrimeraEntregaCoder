import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";
import { generateToken } from "../utils/jwt.utils.js";
import bcryptjs from "bcrypt";

export const loginLogic = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const comparePassword = bcryptjs.compare(password, user.password);

    if (!comparePassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    const token = generateToken(user);
    res.cookie("authToken", token, { httpOnly: true });
    return res.json({ token });
  } catch (error) {
    console.error("Se ha producido un error: " + error.message);
  }
};

export const forgotPassswordLogic = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordHashed = createHash(password);
    await User.updateOne({ email }, { password: passwordHashed });
    res.status(200).json({ message: "Contraseña cambiada" });
  } catch (e) {
    console.error(e);
  }
};
