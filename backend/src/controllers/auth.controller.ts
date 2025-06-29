import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("👉 loginUser called");
    console.log("📦 Request body:", req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log("🔍 Found user:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password did not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    console.log("✅ Token generated");

    return res.status(200).json({ token });
  } catch (error) {
    console.error("🔥 Login failed:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
