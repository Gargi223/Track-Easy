const express = require("express");
const router = express.Router();
const Expense = require("../models/expenseData.js");

// POST route to add an expense
router.post("/add-expense", async (req, res) => {
  try {
    const { date, title, merchant, amount, report, status } = req.body;

    // Create a new expense instance
    const newExpense = new Expense({
      date,
      title,
      merchant,
      amount,
      report,
      status,
    });

    // Save to MongoDB
    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error: error.message });
  }
});

// GET route to fetch all expenses
router.get("/get-expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
});

module.exports = router;
