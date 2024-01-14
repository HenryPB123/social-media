import express from "express";
import { getComments } from "../controllers/commetsControl.js";
import { addComment } from "../controllers/commetsControl.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

export default router;
