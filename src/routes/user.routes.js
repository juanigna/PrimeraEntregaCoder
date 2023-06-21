import { Router } from "express";
import { userPost } from "../users/users.controller.js";
import { User } from "../dao/models/User.model.js";

const router = Router();

router.post("/", userPost);

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users)
})

router.get("/failedRegister", async (req, res) => {
  res.send({ message: "Fallo el registro" });
});

router.get("/successRegister", async (req, res) => {
  console.log("User registered");
  res.send({ message: "User registered!" });
});

router.post("/premium/:uid", async (req, res) => {
  const {uid} = req.params;
  const user = await User.findById({_id: uid});
  if(user){
    user.role = "premium";
    await user.save();
    res.send({message: "User premium!"});
  }
})

export default router;
