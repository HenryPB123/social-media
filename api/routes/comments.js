import express from "express";
import {
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commetsControl.js";
import { addComment } from "../controllers/commetsControl.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.put("/", updateComment);
router.delete("/", deleteComment);

export default router;
