import express from "express";
import { register, login, logout } from "../controllers/authControl.js";

const router = express.Router();

//  (req, res) => {
//   res.send("testeando desde ... ");
// }

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
