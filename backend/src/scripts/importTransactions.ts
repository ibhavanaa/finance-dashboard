import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/Transaction";
import fs from "fs";
import path from "path";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/finance_dashboard";

async function importData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const filePath = path.join(__dirname, "../data/transactions.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await Transaction.deleteMany(); // Optional: Clear old data
    await Transaction.insertMany(data);

    console.log("✅ Transactions imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing transactions:", err);
    process.exit(1);
  }
}

importData();
