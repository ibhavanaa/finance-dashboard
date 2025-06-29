import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

async function createAdmin() {
  await mongoose.connect(MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashedPassword,
  });

  console.log("✅ Admin user created");
  process.exit();
}

createAdmin();
