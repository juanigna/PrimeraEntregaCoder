import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { User } from "../dao/models/User.model.js";
import { createHash, isValidPassword } from "../utils/cryptPassword.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await User.findOne({ email: username });
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
          if (username === "adminCoder@coder.com" && isAdminPass) {
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

          const newUser = await User.create(newUserInfo);
          return done(null, newUser);
        } catch (e) {
          done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });

          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }

          const isValid = isValidPassword(password, user);
          if (!isValid) {
            return done(null, false);
          }

          done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID_GITHUB,
        clientSecret: process.env.CLIENT_SECRET_GITHUB,
        callbackURL: "http://localhost:8080/auth/githubLogin",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({
            email: profile._json.email,
          });

          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };

            const newUser = await User.create(newUserInfo);

            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
