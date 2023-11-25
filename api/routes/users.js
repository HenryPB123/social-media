import express from "express";
import { getUser } from "../controllers/usersControl.js";

const router = express.Router();

router.get("/find/:userId", getUser);

export default router;
