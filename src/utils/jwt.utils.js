import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import { User } from "../dao/models/User.model.js";

export const SECRET_KEY = "juaniBocchi";

export const generateToken = (user) => {
  const token = jwt.sign({ email: user.email }, SECRET_KEY);

  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ message: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

export const authTokenCookies = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const isOk = jwt.verify(token, SECRET_KEY);
  if(!isOk){
    res.status(404).send({err: "JWT_NOT_VALID"});
  }
  console.log(isOk)
  const user = await User.findOne({email: isOk.email}).lean();
  if(!user) return res.status(404).send({err: "JWT_NOT_VALID"});
  req.user = user;
  next();

};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    const token = req.cookies.authToken;
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if(!token) return res.redirect("/login")
      if (!user) {
        return res
          .status(401)
          .send({ error: info.message ? info.message : info.toString() })
      }

      req.user = user.user;
      next();
    })(req, res, next);
  };
};
