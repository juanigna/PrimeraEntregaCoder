import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";

export const loginLogic = async (req, res) => {
  try {
    if (!req.user)
      return res.status(400).json({ error: "Credenciales invalidas" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role,
    };
    res.send({ message: req.user });
    console.log("Se logueo correctamente");
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
