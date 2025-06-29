import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    id: { type: String },                          // Not required but keep if useful
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },      // Allow any value like "Paid"
    user_id: { type: String, required: true },
    user_profile: { type: String, required: true }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
