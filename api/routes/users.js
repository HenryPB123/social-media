import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/usersControl.js";

const router = express.Router();

router.get("/find", (req, res) => {
  res.send("Desde los usuarios");
});
router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
