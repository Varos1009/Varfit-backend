import express from "express";
import { getProgressLogs, logProgress, deleteProgressLog } from "../controllers/progressController.js";

const router = express.Router();

router.get("/", getProgressLogs);
router.post("/", logProgress);
router.delete("/:id", deleteProgressLog);

export default router;
