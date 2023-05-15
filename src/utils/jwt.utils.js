import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

export const SECRET_KEY = "juaniBocchi";

export const generateToken = (user) => {
  const token = jwt.sign({ user: user }, SECRET_KEY);

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

export const authTokenCookies = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, SECRET_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ message: "Not authorized" });
    req.user = credentials.user;
    next();
  });
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
