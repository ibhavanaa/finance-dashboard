import express from "express";
import { loginUser } from "../controllers/auth.controller";

const router = express.Router();

// ✅ TypeScript will now be happy
router.post("/login", async (req, res) => {
  await loginUser(req, res);
});



export default router;
