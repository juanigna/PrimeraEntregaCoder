import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";
import bcrypt from "bcrypt";

export const userPost = async (req, res) => {
  try {
    console.log("User registered");
    res.send({ message: "Usuario registrado" });
  } catch (e) {
    console.log(e.message);
  }
};
