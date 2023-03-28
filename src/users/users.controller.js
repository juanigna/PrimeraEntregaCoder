import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils.js";

export const userPost = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const user = await User.findOne({ email: email });
    let newUserInfo = {};
    if (user) {
      console.log("El usuario ya existe!");
      return done(null, false);
    }
    const passwordAdminHashed = createHash("adminCod3r123");

    const passwordHashed = createHash(password);
    console.log("Contraseña: ", password);
    console.log(passwordAdminHashed, passwordHashed);
    const isAdminPass = passwordAdminHashed === passwordHashed;
    if (email === "adminCoder@coder.com" && isAdminPass) {
      newUserInfo = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        role: "admin",
      };
    } else {
      newUserInfo = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        role: "usuario",
      };
    }

    const token = generateToken(newUserInfo);
    res.cookie("authToken", token, { httpOnly: true });
    const newUser = await User.create(newUserInfo);
    res.json({ message: newUser });
  } catch (e) {
    console.log(e.message);
  }
};
