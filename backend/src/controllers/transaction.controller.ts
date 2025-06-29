import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { Parser } from "json2csv";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      status,
      category,
      user_id,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query;

    const filters: any = {};

    if (status) filters.status = status;
    if (category) filters.category = category;
    if (user_id) filters.user_id = user_id;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate as string);
      if (endDate) filters.date.$lte = new Date(endDate as string);
    }

    const transactions = await Transaction.find(filters)
      .sort({ date: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Transaction.countDocuments(filters);

    return res.status(200).json({
      total,
      page: +page,
      data: transactions
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const exportTransactions = async (req: Request, res: Response) => {
  try {
    const {
      status,
      category,
      user_id,
      startDate,
      endDate,
      columns, // <— selected fields
    } = req.query;

    const filters: Record<string, any> = {};

    if (status) filters.status = (status as string).trim();
    if (category) filters.category = (category as string).trim();
    if (user_id) filters.user_id = (user_id as string).trim();

    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate as string);
      if (endDate) filters.date.$lte = new Date(endDate as string);
    }

    // ✅ Fetch filtered transactions
    const transactions = await Transaction.find(filters).sort({ date: -1 });

    const defaultFields = [
      "id",
      "date",
      "amount",
      "category",
      "status",
      "user_id",
      "user_profile",
    ];

    const selectedFields = (columns as string)
      ?.split(",")
      .filter((field) => defaultFields.includes(field)) || defaultFields;

    // ✅ Prepare plain JS objects with only selected fields
    const plainData = transactions.map((tx) => {
      const txObj = tx.toObject() as Record<string, any>;
      const filtered: Record<string, any> = {};

      for (const field of selectedFields) {
        filtered[field] = txObj[field]; // ✅ Type-safe access
      }

      return filtered;
    });

    const json2csvParser = new Parser({ fields: selectedFields });
    const csv = json2csvParser.parse(plainData);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
    return res.status(200).send(csv);

  } catch (error) {
    console.error("❌ CSV Export Error:", error);
    return res.status(500).json({ message: "CSV export failed", error });
  }
};