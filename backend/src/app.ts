import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";

const app = express();

// ✅ MIDDLEWARES MUST GO FIRST
app.use(cors());
app.use(express.json()); // ✅ REQUIRED to parse req.body

// ✅ ROUTES COME AFTER MIDDLEWARES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
