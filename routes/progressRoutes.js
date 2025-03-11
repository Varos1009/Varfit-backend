import express from "express";
import { getUserProgress, updateProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/:userId", getUserProgress);
router.post("/", updateProgress);

export default router;
