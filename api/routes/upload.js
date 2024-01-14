import express from "express";
import { getUser } from "../controllers/usersControl.js";
import { uploadFiles } from "../controllers/uploadControl.js";

const router = express.Router();

router.post("/", uploadFiles);

export default router;
