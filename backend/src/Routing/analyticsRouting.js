import express from "express";
import { getAnalyticsOverview } from "../controllers/analyticsController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/overview", isAuthenticated, getAnalyticsOverview);

export default router;
