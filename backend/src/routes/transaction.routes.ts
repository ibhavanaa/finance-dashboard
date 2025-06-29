import express from "express";
import { getTransactions, exportTransactions } from "../controllers/transaction.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ use async here to properly forward Promise
router.get("/", async (req, res) => {
  await getTransactions(req, res);
});

router.get("/export", async (req, res) => {
  await exportTransactions(req, res);
});


export default router;
