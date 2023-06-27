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
  res.send({ message: "User registered!" });
});

router.get("/manageUsers", async (req, res) => {
  const users = await User.find({}).lean()
  console.log(users)
  res.render("manageUsers.handlebars", {users})
})

router.post("/premium/:uid", async (req, res) => {
  const { uid } = req.params;
  const user = await User.findById({ _id: uid });
  if (user) {
    user.role = "premium";
    await user.save();
    res.send({ message: "User premium!" });
  }
})

router.delete("/", async (req, res) => {
  try {
    const users = await User.find({});
    let usersToDelete = [];

    users.forEach(user => {
      let lastUserLogoutDate = new Date(user.last_connection.logout_date);
      let currentDate = new Date();

      // Saco los primeros 30 dias desde la fecha actual
      currentDate.setDate(currentDate.getDate() - 30);

      // Comparo para ver si esta entre los 30 dias
      let isWithin30Days = lastUserLogoutDate >= currentDate;

      if (!isWithin30Days) {
        usersToDelete.push(user._id);
      }
    });

    if (usersToDelete[0]) {
      // Borro aquellos usuarios cuyo logout_date es mayor a 30 dias!
      await User.deleteMany({ _id: { $in: usersToDelete } });

      res.json({ message: "Users deleted successfully." });
    }
    res.json({ message: "All the users are within the 30 days!" })

  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting users." });
  }
});

router.delete("/deleteSingle/:uid", async (req, res) => {
  try{
    const uid = req.params.uid;
    if(!uid) res.status(400).json({message: "Please enter a uid"})
    console.log(uid)
    await User.findOneAndDelete({_id:uid});
  }catch(err) {
    return res.status(400).json({message: err})
  }
})

export default router;
