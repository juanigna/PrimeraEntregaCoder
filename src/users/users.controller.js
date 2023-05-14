import { User } from "../dao/models/User.model.js";
import { createHash } from "../utils/cryptPassword.js";
import { generateToken } from "../utils/jwt.utils.js";
import CustomError from "../services/CustomErrors.js";
import EErrors from "../services/enums.js";
import { generateUserInfo, userAlredyExists } from "../services/info.js";
import dotenv from "dotenv";
dotenv.config();

export const userPost = async (req, res) => {
  
    const { first_name, last_name, email, age, password } = req.body;

    if(!first_name || !last_name || !email || !age || !password){
      CustomError.createError({
        name: "User creation error",
        cause: generateUserInfo({first_name, last_name, email, age, password}),
        message: "Error trying to create a new user",
        code: EErrors.INVALID_TYPES_ERROR
      })
    }

    const user =  await User.findOne({ email: email });
    let newUserInfo = {};

    if (user) {
      CustomError.createError({
        name: "User creation error",
        cause: userAlredyExists({email}),
        message: "Error trying to create a new user,  alredy exists!",
        code: EErrors.INVALID_TYPES_ERROR
      })
    }
    const isAdminPass = password === process.env.ADMIN_DB_PASS;
    const isPremiumPass = password === process.env.PREMIUM_DB_PASS;
    if (email === process.env.ADMIN_DB_EMAIL && isAdminPass) {
      newUserInfo = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        role: "admin",
      };
    }else if(email === process.env.PREMIUM_DB_EMAIL && isPremiumPass){
      newUserInfo = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        role: "premium",
      };
    }else {
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
    const newUser =  await User.create(newUserInfo);
    res.json({status:"SUCCESS", payload: newUser });
};
