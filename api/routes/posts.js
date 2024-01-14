import express from "express";
import { addPost, getPosts } from "../controllers/postsControl.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);

export default router;
